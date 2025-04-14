import { useLocation, useNavigate } from 'react-router-dom';

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const { score = 0, total = 10, answers = [] } = location.state || {};
  const percentage = Math.round((score / total) * 100);

  const handleDashboard = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-white px-4 py-8 flex flex-col items-center">
      <div className="w-full max-w-2xl text-center mb-6">
        <h1 className="text-xl text-gray-800 font-semibold mb-1">Sentence Construction</h1>
        <div className="mt-6 flex flex-col items-center">
          <div className="w-24 h-24 rounded-full border-[10px] border-green-400 flex items-center justify-center mb-4">
            <span className="text-2xl font-bold text-green-600">{percentage}</span>
          </div>
          <p className="text-sm text-gray-600 mb-4">Overall Score</p>
        </div>

        <p className="text-gray-700 text-sm max-w-lg mx-auto mb-6">
          While you correctly formed several sentences, there are a couple of areas where improvement is needed. 
          Pay close attention to sentence structure and word placement to ensure clarity and correctness. 
          Review your responses below for more details.
        </p>

        <button
          onClick={handleDashboard}
          className="px-6 py-2 border border-indigo-600 text-indigo-600 rounded-md hover:bg-indigo-50 transition"
        >
          Go to Dashboard
        </button>
      </div>

      <div className="w-full max-w-2xl space-y-6">
        {answers.map((ans, index) => (
          <div key={index} className="bg-gray-50 border rounded-lg p-5 shadow-sm">
            <p className="text-xs font-semibold text-gray-500 mb-2">Prompt</p>
            <p className="text-gray-800 font-medium">{ans.question}</p>
            <div className="mt-4">
              <p className="text-sm font-medium mb-1">
                Your response <span className="font-normal">{ans.isCorrect ? <span className='text-green-400'>Correct</span>: <span className='text-red-500'>Incorrect</span>}</span>
              </p>
              <p className="text-gray-700 text-sm mb-1">{ans.selected.join(' ')}</p>
              {!ans.isCorrect && (
                <p className="text-sm text-gray-500">
                  Correct Answer: {ans.correct.join(' ')}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Result;
