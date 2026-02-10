import { useState } from "react";

const usePollWidgetHook = (options, handleVote, removeVote, isMultiple) => {
  const [pollOptions, setPollOptions] = useState(options);
  const [selectedOption, setSelectedOption] = useState(isMultiple ? [] : null);

  //   useEffect(() => {
  //     const calculateTotalVotes = () => {
  //       const totalVotes = pollOptions.reduce(
  //         (acc, option) => acc + option.value,
  //         0,
  //       );
  //       setTotalVotes(totalVotes);
  //     };
  //     calculateTotalVotes();
  //   }, [pollOptions]);

  const totalVotes = pollOptions.reduce((acc, option) => acc + option.value, 0);
  const handlePollVote = (optionId) => {
    if (!isMultiple) {
      const updatedOptions = pollOptions.map((option) => {
        if (option.id === optionId) {
          return { ...option, value: option.value + 1 };
        } else if (option.id === selectedOption) {
          return { ...option, value: option.value - 1 };
        }
        return option;
      });
      setPollOptions(updatedOptions);
      setSelectedOption(optionId);
      handleVote(updatedOptions);
    } else {
      let updatedSelectedOptions = [...selectedOption];
      const updatedOptions = pollOptions.map((option) => {
        if (option.id === optionId) {
          if (selectedOption.includes(optionId)) {
            updatedSelectedOptions = updatedSelectedOptions.filter(
              (id) => id !== optionId,
            );
            return { ...option, value: option.value - 1 };
          } else {
            updatedSelectedOptions.push(optionId);
            return { ...option, value: option.value + 1 };
          }
        }
        return option;
      });
      setPollOptions(updatedOptions);
      setSelectedOption(updatedSelectedOptions);
      handleVote(updatedOptions);
    }
  };

  const handlePollRemoveVote = () => {
    if (!isMultiple) {
      const updatedOptions = pollOptions.map((option) => {
        if (option.id === selectedOption) {
          return { ...option, value: option.value - 1 };
        }
        return option;
      });
      setPollOptions(updatedOptions);
      setSelectedOption(null);
      removeVote(updatedOptions);
    } else {
      const updatedOptions = pollOptions.map((option) => {
        if (selectedOption.includes(option.id)) {
          return { ...option, value: option.value - 1 };
        }
        return option;
      });
      setPollOptions(updatedOptions);
      setSelectedOption([]);
      removeVote(updatedOptions);
    }
  };

  return {
    totalVotes,
    handlePollVote,
    handlePollRemoveVote,
    pollOptions,
    selectedOption,
  };
};

export default usePollWidgetHook;
