import React from "react";

interface CompletionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CompletionModal: React.FC<CompletionModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-800 p-8 rounded-md shadow-md text-white text-center">
        <h2 className="text-4xl mb-4">Congratulations!</h2>
        <iframe
          src="https://giphy.com/embed/uyoXx0qpUWfQs"
          width="480"
          height="331"
          style={{ border: "none" }}
          frameBorder="0"
          className="giphy-embed"
          allowFullScreen
        ></iframe>
        <p>
          <a href="https://giphy.com/gifs/cool-nice-thumbsup-uyoXx0qpUWfQs">
            via GIPHY
          </a>
        </p>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-purple-900 text-white text-2xl rounded-md"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default CompletionModal;
