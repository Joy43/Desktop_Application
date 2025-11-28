

const Activity = () => {
  return (
    <div className="text-white">
      {
        /* back button */
        <button
          onClick={() => window.history.back()}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Back
        </button>
      }
    </div>
  )
}

export default Activity
