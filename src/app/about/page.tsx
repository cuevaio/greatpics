const AboutPage = () => {
  return (
    <>
      <p className="text-gray-500">Powered by:</p>
      <ul className="list-disc px-8">
        <li>
          <a
            className="font-semibold text-gray-600 transition-colors hover:text-slate-900"
            href="https://vercel.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vercel
          </a>
        </li>
        <li>
          <a
            className="font-semibold text-gray-600 transition-colors hover:text-slate-900"
            href="https://upstash.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Upstash
          </a>
        </li>
        <li>
          <a
            className="font-semibold text-gray-600 transition-colors hover:text-slate-900"
            href="https://uploadthing.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Uploadthing
          </a>
        </li>
        <li>
          <a
            className="font-semibold text-gray-600 transition-colors hover:text-slate-900"
            href="https://replicate.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Replicate
          </a>
        </li>
        <li>
          <a
            className="font-semibold text-gray-600 transition-colors hover:text-slate-900"
            href="https://xata.io"
            target="_blank"
            rel="noopener noreferrer"
          >
            Xata
          </a>
        </li>
        <li>
          <a
            className="font-semibold text-gray-600 transition-colors hover:text-slate-900"
            href="https://openai.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            OpenAI
          </a>
        </li>
      </ul>
    </>
  );
};

export default AboutPage;
