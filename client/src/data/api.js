export const getQuestions = async () => {
    try {
      const res = await fetch('http://localhost:5000/questions');
      const data = await res.json();

      console.log("data coming is======"+data)
      return data;
    } catch (err) {
      console.error('Failed to fetch questions:', err);
      return [];
    }
  };
  