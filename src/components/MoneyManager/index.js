import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'
import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

// Write your code here

class MoneyManager extends Component {
  state = {
    inputTitle: '',
    inputAmount: '',
    activeType: transactionTypeOptions[0].optionId,
    historyList: [],
  }

  getBalance = () => {
    const {historyList} = this.state

    let balance = 0
    let income = 0
    let expenses = 0

    historyList.forEach(eachHistory => {
      if (eachHistory.activeType === transactionTypeOptions[0].optionId) {
        income += eachHistory.amount
      } else {
        expenses += eachHistory.amount
      }
    })
    balance = income - expenses

    return balance
  }

  getExpenses = () => {
    const {historyList} = this.state

    let expenses = 0

    historyList.forEach(eachHistory => {
      if (eachHistory.activeType === transactionTypeOptions[1].optionId) {
        expenses += eachHistory.amount
      }
    })

    return expenses
  }

  getIncome = () => {
    const {historyList} = this.state

    let income = 0

    historyList.forEach(eachHistory => {
      if (eachHistory.activeType === transactionTypeOptions[0].optionId) {
        income += eachHistory.amount
      }
    })

    return income
  }

  addTransaction = event => {
    event.preventDefault()

    const {inputTitle, inputAmount, activeType} = this.state

    const newHistoryList = {
      id: uuidv4(),
      title: inputTitle,
      amount: parseInt(inputAmount),
      activeType,
    }

    this.setState(prevState => ({
      historyList: [...prevState.historyList, newHistoryList],
      inputTitle: '',
      inputAmount: '',
      activeType: transactionTypeOptions[0].optionId,
    }))
  }

  onChangeTitle = event => {
    this.setState({inputTitle: event.target.value})
  }

  onChangeAmount = event => {
    this.setState({inputAmount: parseInt(event.target.value)})
  }

  onChangeOption = event => {
    this.setState({activeType: event.target.value})
  }

  onDeleteHistory = id => {
    this.setState(prevState => ({
      historyList: prevState.historyList.filter(each => each.id !== id),
    }))
  }

  render() {
    const {historyList, activeType, inputTitle, inputAmount} = this.state

    const balance = this.getBalance()
    const expenses = this.getExpenses()
    const income = this.getIncome()

    return (
      <div className="app-container">
        <div className="responsive-container">
          <div className="name-container">
            <h1 className="name">Hi, Richard</h1>
            <p className="greeting">
              Welcome back to your <span className="span">Money Manager</span>
            </p>
          </div>

          <MoneyDetails balance={balance} income={income} expenses={expenses} />

          <div className="transaction-container">
            <form
              className="add-transaction-form"
              onSubmit={this.addTransaction}
            >
              <h1 className="transaction-header">Add Transaction</h1>
              <label className="input-label" htmlFor="title-id">
                TITLE
              </label>
              <input
                className="input"
                id="title-id"
                type="text"
                placeholder="TITLE"
                onChange={this.onChangeTitle}
                value={inputTitle}
              />
              <label className="input-label" htmlFor="amount-id">
                AMOUNT
              </label>
              <input
                className="input"
                id="amount-id"
                type="text"
                placeholder="AMOUNT"
                onChange={this.onChangeAmount}
                value={inputAmount}
              />
              <label className="input-label" htmlFor="type-id">
                TYPE
              </label>
              <select
                className="input"
                onChange={this.onChangeOption}
                value={activeType}
                id="type-id"
              >
                {transactionTypeOptions.map(eachTransactionType => (
                  <option
                    key={eachTransactionType.optionId}
                    value={eachTransactionType.optionId}
                  >
                    {eachTransactionType.displayText}
                  </option>
                ))}
              </select>
              <button className="add-button" type="submit">
                Add
              </button>
            </form>
            <div className="history-container">
              <h1 className="transaction-header">History</h1>
              <div className="transactions-table-container">
                <ul className="history-list">
                  <li className="table-header">
                    <p className="table-header-cell">Title</p>
                    <p className="table-header-cell">Amount</p>
                    <p className="table-header-cell">Type</p>
                  </li>
                  {historyList.map(eachHistoryDetails => (
                    <TransactionItem
                      key={eachHistoryDetails.id}
                      eachHistoryDetails={eachHistoryDetails}
                      onDeleteHistory={this.onDeleteHistory}
                    />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
