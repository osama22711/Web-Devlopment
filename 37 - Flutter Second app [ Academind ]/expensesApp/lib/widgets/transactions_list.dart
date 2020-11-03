import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

import '../models/transactions.dart';

class TransactionList extends StatelessWidget {
  final List<Transactions> transactions;
  Function(String) _deleteTransaction;

  TransactionList(this.transactions, this._deleteTransaction);

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(builder: (ctx, constraints) {
      return transactions.isEmpty
          ? Column(
              children: [
                Text(
                  'No transactions added yet!',
                  style: Theme.of(context).textTheme.title,
                ),
                SizedBox(
                  height: 10,
                ),
                Container(
                  height: constraints.maxHeight * 0.6,
                  child: Image.asset(
                    'assets/images/waiting.png',
                    fit: BoxFit.cover,
                  ),
                ),
              ],
            )
          : ListView.builder(
              itemCount: transactions.length,
              itemBuilder: (ctx, index) {
                return Card(
                  margin: EdgeInsets.symmetric(vertical: 8, horizontal: 5),
                  elevation: 6,
                  child: ListTile(
                    leading: Padding(
                      padding: EdgeInsets.all(6),
                      child: FittedBox(
                        child: CircleAvatar(
                          radius: 30,
                          child: Text(
                            '\$${transactions[index].amount}',
                            style: TextStyle(
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ),
                      ),
                    ),
                    title: Text(
                      transactions[index].title,
                      style: Theme.of(context).textTheme.title,
                    ),
                    subtitle: Text(
                      DateFormat.yMMMd().format(transactions[index].date),
                    ),
                    trailing: MediaQuery.of(context).size.width > 430
                        ? FlatButton.icon(
                            textColor: Theme.of(context).errorColor,
                            icon: Icon(Icons.delete),
                            label: Text(
                              'Delete',
                              style: TextStyle(fontWeight: FontWeight.bold),
                            ),
                            onPressed: () =>
                                _deleteTransaction(transactions[index].id),
                          )
                        : IconButton(
                            icon: Icon(Icons.delete),
                            onPressed: () =>
                                _deleteTransaction(transactions[index].id),
                          ),
                  ),
                );
              },
            );
    });
  }
}
