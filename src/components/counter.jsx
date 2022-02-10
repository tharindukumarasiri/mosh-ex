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
            <div className="col-1 d-flex align-items-center">
                <span className={getColorsBadge()}>{getCounterText()}</span>
            </div>
            <div className="col">
                <button type="button" className="btn btn-secondary btn-m" onClick={() => increment(counter)}>
                    +
                </button>
                <button type="button" className="btn btn-secondary btn-m m-2" onClick={() => decrement(counter)} disabled={counter.value < 1}  >
                    -
                </button>
                <button type="button" className="btn btn-danger btn-m" onClick={() => deleteCount(counter)}>
                    X
                </button>
            </div>
        </div>
    );
}
