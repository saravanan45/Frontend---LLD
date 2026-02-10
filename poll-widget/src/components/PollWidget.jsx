import usePollWidgetHook from "./usePollWidgetHook";

const PollWidget = ({
  header,
  options,
  handleVote,
  removeVote,
  isMultiple,
}) => {
  const {
    pollOptions,
    totalVotes,
    handlePollVote,
    handlePollRemoveVote,
    selectedOption,
  } = usePollWidgetHook(options, handleVote, removeVote, isMultiple);

  return (
    <div style={{ border: "1px solid black", padding: "16px", width: "200px" }}>
      <header
        style={{ fontWeight: "bold", fontSize: "18px", margin: "0 0 16px" }}
      >
        {header}
      </header>

      {pollOptions.map((option) => (
        <div key={option.id} style={{ marginBottom: "8px" }}>
          {isMultiple ? (
            <>
              <input
                type="checkbox"
                id={option.id}
                value={option.id}
                onClick={() => handlePollVote(option.id)}
                checked={selectedOption.includes(option.id)}
              />
              <label htmlFor={option.id}>{option.label}</label>
            </>
          ) : (
            <>
              <input
                type="radio"
                id={option.id}
                name="poll"
                value={option.id}
                onChange={() => handlePollVote(option.id)}
                checked={selectedOption === option.id}
              />
              <label htmlFor={option.id}>{option.label}</label>
            </>
          )}
          <br />
          <progress value={option.value} max={totalVotes || 1}></progress>
        </div>
      ))}

      {selectedOption ? (
        <button onClick={() => handlePollRemoveVote()}>Remove Vote</button>
      ) : null}
    </div>
  );
};

export default PollWidget;
