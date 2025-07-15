const PAY_SALARY = value => {
  if (!value?.description) {
    return {
      result: false,
      errMsg: 'Additional salary description is required'
    };
  }
  if (value?.description.length > 50) {
    return {
      result: false,
      errMsg: 'Additional salary description must be less than 50 characters'
    };
  }
  if (!value?.minimumAmount) {
    return {
      result: false,
      errMsg: 'minimumAmount is required'
    };
  }
  if (!value?.maximumAmount) {
    return {
      result: false,
      errMsg: 'maximumAmount is required'
    };
  }
  if (value?.minimumAmount > value?.maximumAmount) {
    return {
      result: false,
      errMsg: 'minimumAmount must be less than maximumAmount'
    };
  }

  return {
    result: true,
    errMsg: ''
  };
};

export default PAY_SALARY;
