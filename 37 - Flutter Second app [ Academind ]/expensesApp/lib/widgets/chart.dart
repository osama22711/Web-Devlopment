import 'package:expensesApp/models/transactions.dart';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

class Chart extends StatelessWidget {
  final List<Transactions> recentTransations;

  Chart(this.recentTransations);

  List<Map<String, Object>> get groupedTransationValues {
    return List.generate(7, (index) {
      final weekDay = DateTime.now().subtract(Duration(days: index));

      var totalSum = 0.0;

      for (var i = 0; i < recentTransations.length; i++) {
        if (recentTransations[i].date.day == weekDay.day &&
            recentTransations[i].date.month == weekDay.month &&
            recentTransations[i].date.year == weekDay.year) {
          totalSum += recentTransations[i].amount;
        }
      }

      return {
        'day': DateFormat.E().format(weekDay),
        'amount': totalSum,
      };
    });
  }

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 6,
      margin: EdgeInsets.all(20),
      child: Row(
        children: [],
      ),
    );
  }
}