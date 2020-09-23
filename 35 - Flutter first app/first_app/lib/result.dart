import 'package:flutter/material.dart';

class Result extends StatelessWidget {
  final int totalScore;
  final Function resetHandler;

  Result(this.totalScore, this.resetHandler);

  String get textPhrase {
    String textString;
    if (totalScore <= 7) {
      textString = 'You are awesome and innocent!';
    } else if (totalScore <= 13) {
      textString = 'Fair enough!';
    } else if (totalScore <= 16) {
      textString = 'Get better!';
    } else {
      textString = 'Nonononoono score for you!';
    }
    return textString;
  }

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Column(
        children: [
          Text(
            textPhrase,
            style: TextStyle(fontSize: 36, fontWeight: FontWeight.bold),
            textAlign: TextAlign.center,
          ),
          FlatButton(
            child: Text('Reset Quiz!'),
            textColor: Colors.blue,
            onPressed: resetHandler,
          ),
        ],
      ),
    );
  }
}
