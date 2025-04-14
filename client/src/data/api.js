export const getQuestions = async () => {
    try {
      const res = await fetch('https://camonk-backend.onrender.com/questions');
      const data = await res.json();

      console.log("data coming is======"+data)
      return data;
    } catch (err) {
      console.error('Failed to fetch questions:', err);
      return [];
    }
  };
  