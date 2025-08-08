import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

const videoExamples = [
  {
    title: 'Business & Marketing Videos',
    videoId: 'sNPPl7KUJg4',
    description: 'Product demos, testimonials, social media ads. Professional presentation, brand-consistent editing. Optimized for conversion and engagement.'
  },
  {
    title: 'Social Media Content',
    videoId: 'f5_a33xYnQ8',
    description: 'Instagram Reels, TikTok videos, YouTube Shorts. Platform-specific formatting and captions. Trending styles and engagement optimization.'
  },
  {
    title: 'Educational Content',
    videoId: '6l8EAqt1oVU',
    description: 'Course videos, tutorials, training materials. Clear audio, professional graphics, easy-to-follow editing. Student engagement focused.'
  },
  {
    title: 'Creator Content',
    videoId: null, // Placeholder for missing video
    description: 'YouTube videos, podcast clips, personal brand content. Audience retention focused editing. Consistent style development.',
    placeholder: true
  }
];

export function VideoExamplesSection() {
  return (
    <section id="examples" className="py-20 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
            See Our Work in Action
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Check out these examples of our professional video editing across different content types.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {videoExamples.map((video, index) => (
            <Card
              key={index}
              className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 bg-gradient-to-br from-background to-secondary/50 overflow-hidden"
            >
              <CardContent className="p-0">
                <div className="relative aspect-video">
                  {video.placeholder ? (
                    <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-4xl mb-2">🎬</div>
                        <p className="text-sm text-muted-foreground">Video Coming Soon</p>
                      </div>
                    </div>
                  ) : (
                    <iframe
                      src={`https://www.youtube.com/embed/${video.videoId}`}
                      title={video.title}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      loading="lazy"
                    />
                  )}
                </div>
              </CardContent>
              <CardHeader>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">
                  {video.title}
                </CardTitle>
                <p className="text-muted-foreground">{video.description}</p>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}