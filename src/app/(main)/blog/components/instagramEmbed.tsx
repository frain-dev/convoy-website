type IGProps = {
	url: string;
};

export default function InstagramEmbed({ url }: IGProps) {
	return (
		<>
			<div className="relative not-prose flex flex-col items-center justify-center">
                <blockquote
                    className="instagram-media"
                    data-instgrm-permalink={`${url}/?utm_source=ig_embed&amp;utm_campaign=loading`}
                    data-instgrm-version="14"
                    style={{ maxWidth: '540px', minWidth: '406px', padding: 0, width: '99.375%' }}>
                    <div style={{ padding: '16px' }}>
                        <a href={`${url}/?utm_source=ig_embed&amp;utm_campaign=loading`} target="_blank"></a>
                    </div>
                </blockquote>
            </div>
			<script async src="//www.instagram.com/embed.js"></script>
		</>
	);
}
