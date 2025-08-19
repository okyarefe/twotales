export default function StoryPreview() {
  return (
    <div className="relative bg-gray-50 rounded-lg p-6 border border-gray-200">
      <div className="space-y-4">
        {/* English Story */}
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <h4 className="text-sm font-medium text-gray-700 mb-2">
            English Story
          </h4>
          <div className="space-y-2 text-sm text-gray-800">
            <p>
              Maya discovered a mysterious glowing door in her
              grandmother&apos;s attic.
            </p>
            <p className="bg-purple-100 px-2 py-1 rounded">
              She hesitated for a moment, then bravely turned the ancient golden
              handle.
            </p>
            <p>
              Suddenly, she found herself in a magical forest filled with
              singing flowers.
            </p>
          </div>
        </div>

        {/* Turkish Story */}
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <h4 className="text-sm font-medium text-gray-700 mb-2">
            Turkish Story
          </h4>
          <div className="space-y-2 text-sm text-gray-800">
            <p>
              Maya büyükannesinin tavan arasında gizemli parlayan bir kapı
              keşfetti.
            </p>
            <p className="bg-purple-100 px-2 py-1 rounded">
              Bir an tereddüt etti, sonra cesurca eski altın kapı kolunu
              çevirdi.
            </p>
            <p>
              Aniden kendini şarkı söyleyen çiçeklerle dolu büyülü bir ormanda
              buldu.
            </p>
          </div>
        </div>

        <p className="text-xs text-gray-500 text-center">
          Click any sentence to see its meaning in the other language
        </p>
      </div>
    </div>
  );
}
