import {
    Select,
    Button,
    MenuItem,
    Typography,
    InputLabel,
    FormControl,
    Stack,
  } from '@mui/material';
  import React from 'react';
  import axios from 'axios';
  
  const API_URL = 'https://opentdb.com/api.php';
  
  const StatusPage = () => {
    const [formData, setFormData] = React.useState({
      numberOfQuestions: 5,
      type: '',
      category: '',
      encoding: '',
      difficulty: '',
    });
  
    const [score, setScore] = React.useState(0);
    const [timer, setTimer] = React.useState(20);
    const [clicked, setClicked] = React.useState(false);
    const [questions, setQuestions] = React.useState([]);
    const [categories, setCategories] = React.useState([]);
    const [userAnswers, setUserAnswers] = React.useState({});
    const [quizResult, setQuizResult] = React.useState(null);
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [quizStarted, setQuizStarted] = React.useState(false);
    const [quizFinished, setQuizFinished] = React.useState(false);
  
    // ok
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };
  
    // ok
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(API_URL, {
          params: {
            amount: formData.numberOfQuestions,
            category: formData.category,
            difficulty: formData.difficulty,
            type: formData.type,
            encoding: formData.encoding,
          },
        });
        const fetchedQuestions = response.data.results;
  
        if (fetchedQuestions.length > 0) {
          setQuestions(fetchedQuestions);
          setTimer(20);
        } else {
          console.error('No questions fetched from the API.');
        }
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };
  
    // ok
    const handleStartQuiz = async () => {
      if (!formData.category || !formData.difficulty) {
        alert('Please fill in all fields before starting the quiz.');
        return;
      }
      try {
        setCurrentIndex(0);
        setUserAnswers({});
        setScore(0);
        await fetchQuestions();
        startTimer();
        setQuizStarted(true);
        setQuizFinished(false);
      } catch (error) {
        console.error('Error starting quiz:', error);
      }
    };
  
    // ok
    React.useEffect(() => {
      const fetchCategories = async () => {
        try {
          const response = await axios.get(
            'https://opentdb.com/api_category.php',
          );
          const categories = response.data.trivia_categories;
          setCategories(categories);
        } catch (error) {
          console.error('Error fetching categories:', error);
        }
      };
  
      fetchCategories();
    }, []);
  
    // ok
    const startTimer = () => {
      const intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
  
      return () => clearInterval(intervalId);
    };
  
    const handleNextQuestion = () => {
      // Wait for 1 second before moving to the next question
      setTimeout(() => {
        const nextIndex = currentIndex + 1;
        if (nextIndex < questions.length) {
          setCurrentIndex(nextIndex);
          setTimer(20);
        } else {
          setQuizFinished(true);
        }
      }, 1000);
    };
  
    const handleAnswerSelect = (answer) => {
      setUserAnswers((prevAnswers) => ({
        ...prevAnswers,
        [currentIndex]: answer,
      }));
    };
  
    const handleSubmitQuiz = () => {
      const newScore = questions.reduce((acc, question, index) => {
        if (userAnswers[index] === question.correct_answer) {
          return acc + 1;
        }
        return acc;
      }, 0);
      console.log(newScore);
      setScore(newScore);
      setQuizFinished(true); // nomalum
      setQuizResult(newScore === questions.length ? 'success' : 'failure');
    };
  
    React.useEffect(() => {
      if (timer === 0 && currentIndex !== questions.length) {
        handleNextQuestion();
      }
    }, [timer, currentIndex]);
  
    React.useEffect(() => {
      if (currentIndex >= questions.length && questions > 0) {
        handleSubmitQuiz();
      }
    }, [currentIndex]);
  
    const questionOption = (answer) => {
      const options = [answer, ...questions[currentIndex].incorrect_answers];
  
      const getButtonColor = (item) => {
        if (clicked) {
          return userAnswers[currentIndex] ===
            questions[currentIndex].correct_answer
            ? 'secondary'
            : 'error';
        } else {
          return 'primary';
        }
      };
  
      return options.map((item) => (
        <Button
          key={item}
          fullWidth
          variant="outlined"
          color={getButtonColor(item)}
          onClick={() => {
            handleAnswerSelect(item);
            setClicked(true);
          }}
        >
          {item}
        </Button>
      ));
    };
  
    return (
      <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
        {quizStarted && !quizFinished && (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h6" mr={3}>
              Time remaining:
            </Typography>
            <Typography variant="h6" color={timer > 0 && timer <= 10 && 'error'}>
              {`${timer} seconds`}
            </Typography>
          </div>
        )}
        {!quizStarted && !quizFinished && (
          <>
            <FormControl fullWidth sx={{ mb: 4 }}>
              <InputLabel>Number of Questions</InputLabel>
              <Select
                name="numberOfQuestions"
                value={formData.numberOfQuestions}
                onChange={handleInputChange}
              >
                {[5, 10, 15, 20].map((number) => (
                  <MenuItem key={number} value={number}>
                    {number}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ mb: 4 }}>
              <InputLabel>Select Category</InputLabel>
              <Select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
              >
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ mb: 4 }}>
              <InputLabel>Select Difficulty</InputLabel>
              <Select
                name="difficulty"
                value={formData.difficulty}
                onChange={handleInputChange}
              >
                <MenuItem value="easy">Easy</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="hard">Hard</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ mb: 4 }}>
              <InputLabel>Select Type</InputLabel>
              <Select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
              >
                <MenuItem value="multiple">Multiple Choice</MenuItem>
                <MenuItem value="boolean">True / False</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ mb: 4 }}>
              <InputLabel>Select Encoding</InputLabel>
              <Select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
              >
                <MenuItem value="multiple">Multiple Choice</MenuItem>
                <MenuItem value="boolean">True / False</MenuItem>
              </Select>
            </FormControl>
            <Button
              variant="contained"
              color="primary"
              onClick={handleStartQuiz}
              style={{ marginBottom: 20 }}
            >
              Start Quiz
            </Button>
          </>
        )}
  
        {quizStarted && !quizFinished && questions.length > 0 && (
          <div>
            <Typography variant="h6">
              {questions[currentIndex].question}
            </Typography>
            <Stack spacing={4} mt={4}>
              {questions[currentIndex].incorrect_answers.map((answer) => (
                <Button
                  fullWidth
                  key={answer}
                  variant="outlined"
                  color={
                    userAnswers[currentIndex] === answer ? 'error' : 'primary'
                  }
                  onClick={() => {
                    handleNextQuestion();
                    handleAnswerSelect(answer);
                  }}
                >
                  {answer}
                </Button>
              ))}
              <Button
                fullWidth
                variant="outlined"
                color={
                  userAnswers[currentIndex] ===
                  questions[currentIndex].correct_answer
                    ? 'secondary'
                    : 'primary'
                }
                onClick={() => {
                  handleNextQuestion();
                  handleAnswerSelect(questions[currentIndex].correct_answer);
                }}
              >
                {questions[currentIndex].correct_answer}
              </Button>
            </Stack>
            {/* <Stack spacing={4} mt={4}>
              {questions[currentIndex].incorrect_answers.map((answer) =>
              // {questionOption(questions[currentIndex].correct_answer)}
              <Button
                  fullWidth
                  key={answer}
                  variant="outlined"
                  color={
                    userAnswers[currentIndex] === answer ? "error" : "primary"
                  }
                  onClick={() => handleAnswerSelect(answer)}
                >
                  {answer}
                </Button>
              )}
              <Button
                fullWidth
                variant="outlined"
                color={
                  userAnswers[currentIndex] ===
                  questions[currentIndex].correct_answer
                    ? "secondary"
                    : "primary"
                }
                onClick={() =>
                  handleAnswerSelect(questions[currentIndex].correct_answer)
                }
              >
                {questions[currentIndex].correct_answer}
              </Button>
            </Stack> */}
            <Button
              variant="contained"
              color="primary"
              onClick={handleNextQuestion}
              style={{ marginTop: 20 }}
            >
              Next Question
            </Button>
          </div>
        )}
  
        {quizFinished && (
          <div>
            <Typography variant="h5">
              Your Score: {score} / {questions.length}
            </Typography>
            <Typography variant="h6">
              {quizResult === 'success' ? 'Success!' : 'Try Again!'}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => window.location.reload()}
              style={{ marginTop: 20 }}
            >
              Start Over
            </Button>
          </div>
        )}
      </div>
    );
  };
  
  export default StatusPage;
  