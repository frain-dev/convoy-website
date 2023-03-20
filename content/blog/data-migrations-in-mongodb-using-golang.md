---
title: Data Migrations in MongoDB using Golang
feature_image: update_screenshot.png
post_image: update_screenshot.png
primary_author:
    name: Subomi Oluwalana
    twitter: subomiOluwalana
primary_tag: Product Update
tags:
    - Convoy
    - Engineering
featured: false
description: When reproducible upgrades and downgrades are a requirement, it is not straightforward how to achive this in MongoDB using Golang. In this article, we describe the problem in detail, and how we solved it
published_at: 2022-09-02T12:04:00.000+00:00
---

Hi there 👋🏽

### Introduction

One of the reasons we decided to use MongoDB as the choice database for Convoy was the schemaless nature of webhook events. Events for various providers and use cases come in different shapes and sizes, and we wanted to support them all. The second reason we chose it, which is a simple corollary to the first, is it provides better tools to query JSON payloads; because JSON is more like the de-facto format for webhook events. We wanted to power to filter JSON efficiently. And lastly, it’s the NoSQL database we are more comfortable with.

While this has worked well for us, one requirement we did not anticipate was migrations. In building an OSS project, we need to provide an effective way for users to upgrade from lower to more recent versions. This includes migrating over their old data efficiently. In this article, we’ll talk about the problem we faced along these lines, the possible solutions that exist and the approach we went ahead with and will close out by describing possible future work.

### The Problem & Possible Solutions

When upgrading software services, asides from providing a Changelog to users, explaining what’s new and what’s a breaking change, where possible, users should be able to run a command to easily upgrade to the latest software version bringing over their old data. If you build a project in rails, `rails migrate` solves this problem. This is similar to the technique used by [Posthog](https://github.com/PostHog/posthog); it was built with Python Django so running `python manage.py migrate` works!

But how do you solve this same problem easily with Golang and MongoDB. There are some solutions but these solutions don’t work if you’re building with Golang and MongoDB and especially if you need reproducible upgrades and downgrades. Let’s look through possible solutions and their drawbacks.

1. [golang-migrate](https://github.com/golang-migrate/migrate): This solution is like the de-facto migration tool for Go. It’s really great, because it supports a variety of databases, even MongoDB. Its MongoDB driver uses JSON files to describe up and down migrations. See below for an example:

    ```json
    [
    	{
    		"aggregate": "users",
    		"pipeline": [
    			{
    				"$project": {
    					"_id": 1,
    					"firstname": 1,
    					"lastname": 1,
    					"username": 1,
    					"password": 1,
    					"email": 1,
    					"active": 1,
    					"fullname": { "$concat": ["$firstname", " ", "$lastname"] }
    				}
    			},
    			{
    				"$out": "users"
    			}
    		],
    		"cursor": {}
    	}
    ]
    ```

    The problem here is it requires you to learn a lot of MongoDB queries to perform basic operations. Compare this to a similar solution in rails:

    ```ruby
    class AddFullNameToUsers < ActiveRecord::Migration[6.1]
    	def change
    		add_column :users, :fullname, null: true

    			User.each do |user|
    				user.update!(fullname: user.firstname + " " + user.lastname)
    			end

    		change_column_null :users, :fullname, false
    	end
    end
    ```

    With basic ruby skills, you can write migrations. The second problem here is it is error prone because some queries might work well for different versions of MongoDB.

2. [gormigrate](https://github.com/go-gormigrate/gormigrate) & [goose](https://github.com/pressly/goose): These solutions are an excellent choice because they allow us to define migrations with Go code. This is similar to the rails way shown above. See an example of gorm below:

    ```go
    db, err := gorm.Open("sqlite3", "mydb.sqlite3")
    if err != nil {
    	log.Fatal(err)
    }

    db.LogMode(true)

    	m := gormigrate.New(db, gormigrate.DefaultOptions, []*gormigrate.Migration{
    		// add age column to persons
    		{
    			ID: "201608301415",
    			Migrate: func(tx *gorm.DB) error {
    				// when table already exists, it just adds fields as columns
    				type Person struct {
    					Age int
    				}
    				return tx.AutoMigrate(&Person{})
    			},
    			Rollback: func(tx *gorm.DB) error {
    				return tx.Migrator().DropColumn("people", "age")
    			},
    		}
    	})

    	if err = m.Migrate(); err != nil {
    		log.Fatalf("Could not migrate: %v", err)
    	}
    	log.Printf("Migration did run successfully")
    }
    ```

    The problem with these solutions again is - They don’t support MongoDB 😞

3. Adhoc Scripts: This is the most common approach when you’re building closed-source projects. These projects don’t require that multiple users with multiple versions can be running in production simultaneously, and each user needs to be able to upgrade whenever they want. Adhoc Scripts don’t have a long life to live. They don’t have a linear history. Once applied in production they’re disposed. This won’t work for us!

### Our Approach

Our approach was inspired by `gormigrate`, we refactored the same code to depend on mongoDB as well as not require schema migrations for MongoDB. With this, we end up with code like:

```go
m := migrate.NewMigrator(c, opts, []*Migration{
			{
				ID: "201608301400",
				Migrate: func(db *mongo.Database) error {
					return nil
				},
				Rollback: func(db *mongo.Database) error {
					return nil
				},
			},
			{
				ID: "201608301430",
				Migrate: func(db *mongo.Database) error {
					return nil
				},
				Rollback: func(db *mongo.Database) error {
					return nil
				},
			},
		})

m.Migrate(context.Background())
```

You can find the full port over [here](https://github.com/frain-dev/convoy/tree/main/internal/pkg/migrate).

### Possible Future Work?

My next goal would be to upstream this port to either goose or gormigrate so this is useful to someone else out of the box.

### Conclusion

I hope this helps someone thinking of using Golang and MongoDB in their project. Did I make an error in this article? Please let me know [@subomiOluwalana](https://twitter.com/subomiOluwalana)

Bye for now 👋🏽
