import 'package:flutter/material.dart';

import './quiz.dart';
import './result.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    return _MyAppState();
  }
}

class _MyAppState extends State<MyApp> {
  final _questions = [
    {
      'questionText': 'What\'s your favourite color?',
      'answers': [
        {'text': 'Red', 'score': 7},
        {'text': 'Black', 'score': 10},
        {'text': 'White', 'score': 1},
        {'text': 'Blue', 'score': 3}
      ]
    },
    {
      'questionText': 'What\'s your favourite animal?',
      'answers': [
        {'text': 'Rabbit', 'score': 8},
        {'text': 'Elephant', 'score': 5},
        {'text': 'Snake', 'score': 10},
        {'text': 'Bear', 'score': 4}
      ]
    },
    {
      'questionText': 'Who\'s your favourite instructor?',
      'answers': [
        {'text': 'Max', 'score': 4},
        {'text': 'Max', 'score': 4},
        {'text': 'Max', 'score': 4},
        {'text': 'Max', 'score': 4}
      ]
    },
  ];

  var _questionIndex = 0;
  var _totalScore = 0;

  void answerQuestion(int score) {
    _totalScore += score;

    setState(() {
      _questionIndex++;
    });
    print('Answer chosen and total score is $_totalScore');
  }

  void resetQuiz() {
    setState(() {
      _questionIndex = 0;
      _totalScore = 0;
    });
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: Text('My first app'),
        ),
        body: _questionIndex < _questions.length
            ? Quiz(
                questions: _questions,
                questionIndex: _questionIndex,
                answerQuestion: answerQuestion)
            : Result(_totalScore, resetQuiz),
      ),
    );
  }
}
