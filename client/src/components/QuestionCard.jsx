import { useEffect, useState } from 'react';
import Timer from './Timer';
import { useNavigate } from 'react-router-dom';
import { getQuestions } from '../data/api';

const QuestionCard = () => {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selectedWords, setSelectedWords] = useState([]);
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getQuestions();
      setQuestions(data);
      setOptions(data[0].options);
    };
    fetchData();
  }, []);

  const handleWordClick = (word) => {
    if (!selectedWords.includes(word)) {
      setSelectedWords([...selectedWords, word]);
    }
  };

  const handleWordUnselect = (word) => {
    setSelectedWords(selectedWords.filter((w) => w !== word));
  };

  const handleNext = () => {
    const correctAnswer = questions[current].correctAnswer;
    const isCorrect = JSON.stringify(correctAnswer) === JSON.stringify(selectedWords);

    const currentFeedback = {
      question: questions[current].question,
      selected: [...selectedWords],
      correct: correctAnswer,
      isCorrect,
    };

    setAnswers([...answers, currentFeedback]);

    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    if (current + 1 < questions.length) {
      setCurrent((prev) => prev + 1);
      setSelectedWords([]);
      setOptions(questions[current + 1].options);
    } else {
      navigate('/result', {
        state: {
          score: isCorrect ? score + 1 : score,
          total: questions.length,
          answers: [...answers, currentFeedback],
        },
      });
    }
  };

  if (!questions.length) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white w-[650px] p-6 rounded-xl shadow-md border border-gray-200 relative">
        <div className="absolute top-4 right-4">
          <button className="bg-gray-100 text-sm text-gray-700 px-4 py-1 rounded-md border hover:bg-gray-200">Quit</button>
        </div>

        <div className="flex justify-between items-center mb-2">
          <div className="text-gray-700 font-medium text-lg">
            <Timer onTimeUp={handleNext} key={current} />
          </div>
        </div>

        <div className="flex mb-4 space-x-1">
          {Array.from({ length: questions.length }).map((_, idx) => (
            <div
              key={idx}
              className={`h-2 flex-1 rounded-full ${
                idx <= current ? 'bg-orange-400' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>

        <div className="border-2 border-green-600 text-center text-green-700 text-sm font-semibold py-2 mb-4">
          Select the missing words in the correct order
        </div>

        <div className="mb-4 text-lg text-gray-800">
          <p className="leading-relaxed">{questions[current].question}</p>
        </div>

        <div className="flex flex-wrap gap-2 mb-6 min-h-[40px]">
          {selectedWords.map((word, index) => (
            <button
              key={index}
              onClick={() => handleWordUnselect(word)}
              className="px-3 py-1 bg-blue-100 rounded-full text-sm hover:bg-blue-200"
            >
              {word} ❌
            </button>
          ))}
        </div>

        <div className="grid grid-cols-4 gap-3 mb-6">
          {options.map((word, index) => (
            <button
              key={index}
              onClick={() => handleWordClick(word)}
              className={`px-4 py-2 bg-gray-200 rounded-md text-sm font-medium hover:bg-gray-300 ${
                selectedWords.includes(word) ? 'opacity-50 pointer-events-none' : ''
              }`}
            >
              {word}
            </button>
          ))}
        </div>

        <button
          onClick={handleNext}
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default QuestionCard;
