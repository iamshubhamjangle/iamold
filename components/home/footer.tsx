const Footer: React.FC = () => (
  <div className="bg-white/80 backdrop-blur-sm border-t border-blue-200 mt-16">
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center space-y-4">
        <div className="flex justify-center space-x-6 text-gray-600">
          <div className="flex flex-col items-center space-x-2 md:hidden">
            <span>Free</span>
            <span>Open Source</span>
            <span>No login required</span>
          </div>
          <div className="hidden md:flex space-x-2">
            <span>Free to use</span>
            <span>•</span>
            <span>Open Source</span>
            <span>•</span>
            <span>No login required</span>
          </div>
        </div>
        <div className="text-xs text-gray-400">
          Made with ❤️ by{" "}
          <a
            className="underline"
            href="https://www.linkedin.com/in/imshubhamjangle/"
            target="_blank"
          >
            shubham jangle
          </a>
        </div>
      </div>
    </div>
  </div>
);

export default Footer;
