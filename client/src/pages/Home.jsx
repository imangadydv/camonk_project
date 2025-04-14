import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/question');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg p-8 rounded-lg border-2 border-gray-200 w-[400px] text-center">
        <div className="text-4xl mb-4 text-gray-800">
          ✏️
        </div>
        <h1 className="text-xl font-semibold mb-2">Sentence Construction</h1>
        <p className="text-sm text-gray-600 mb-6">
          Select the correct words to complete the sentence by arranging the provided options in the right order.
        </p>

        <div className="flex justify-around text-sm text-gray-700 border-t pt-4 border-b pb-4">
          <div>
            <p className="font-medium">Time Per Question</p>
            <p>30 sec</p>
          </div>
          <div>
            <p className="font-medium">Total Questions</p>
            <p>10</p>
          </div>
          <div>
            <p className="font-medium">Coins</p>
            <p className="text-yellow-500">🟡 0</p>
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <button className="border border-green-500 text-green-500 px-6 py-2 rounded hover:bg-green-50">
            Back
          </button>
          <button
            onClick={handleStart}
            className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
          >
            Start
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
