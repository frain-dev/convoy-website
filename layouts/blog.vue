<template>
    <div class="flex-wrap min-h-screen bg-[#fafafe]">
        <Header></Header>

        <div class="w-full bg-transparent -mt-110px"></div>

        <div class="pt-150px pb-100px max-w-[1237px] w-full mt-110px m-auto">
            <slot />
        </div>

        <Footer></Footer>
    </div>
</template>
