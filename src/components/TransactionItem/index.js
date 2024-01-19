// Write your code here
import './index.css'

const TransactionItem = props => {
  const {eachHistoryDetails, onDeleteHistory} = props
  const {title, amount, activeType, id} = eachHistoryDetails

  const onDelete = () => {
    onDeleteHistory(id)
  }

  return (
    <li className="history-transaction">
      <p className="title-bar">{title}</p>
      <p className="title-bar">{amount}</p>
      <p className="title-bar">{activeType}</p>
      <div className="delete-container">
        <button
          type="button"
          className="delete"
          onClick={onDelete}
          data-testid="delete"
        >
          <img
            className="image"
            src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
            alt="delete"
          />
        </button>
      </div>
    </li>
  )
}

export default TransactionItem
