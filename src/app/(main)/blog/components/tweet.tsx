type TweetProps = {
	url: string;
};

export default function EmbeddedTweet({ url }: TweetProps) {
	return (
		<>
			<div className="relative not-prose flex flex-col items-center justify-center">
				<blockquote className="twitter-tweet" data-conversation="none" data-theme="dark" data-lang="en" data-dnt="true">
					<a className="text-14 leading-7 text-gray-500" href={url}>
						Loading tweet...
					</a>
				</blockquote>
			</div>
			<script async defer src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
		</>
	);
}
