import React from "react";

export default function Counter({ counter, increment, decrement, deleteCount }) {

    const getColorsBadge = () => {
        if (counter.value > 0) {
            return "badge bg-primary"
        } else {
            return "badge bg-warning"
        }
    }

    const getCounterText = () => {
        if (counter.value > 0) {
            return counter.value
        } else {
            return "ZERO"
        }
    }

    return (
        <div className="row">
            <div className="col">
                <span className={getColorsBadge()}>{getCounterText()}</span>
            </div>
            <div className="col">
                <button type="button" className="btn btn-secondary" onClick={() => increment(counter)}>
                    +
                </button>
            </div>
            <div className="col">
                <button type="button" className="btn btn-secondary" onClick={() => decrement(counter)} disabled={counter.value < 1}  >
                    -
                </button>
            </div>
            <div className="col">
                <button type="button" className="btn btn-danger" onClick={() => deleteCount(counter)}>
                    X
                </button>
            </div>
            <br />
        </div>
    );
}
