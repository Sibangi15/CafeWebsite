const Alert = ({ alert }) => {
    if (!alert) return null;

    return (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-100">
            <div
                className={`px-6 py-3 rounded-lg shadow-lg text-white
                ${alert.type === "success" ? "bg-green-900" : "bg-red-900"}`}
            >
                {alert.msg}
            </div>
        </div>
    );
};

export default Alert;
