const transformSalary = value => {
  const output = {};
  value = Object.assign(
    {},
    {
      payType: 'monthly',
      currency: 'USD'
    },
    value
  );
  if (value.payType === 'hourly') {
    output.basisCode = 'Hourly';
    output.ranges = [
      {
        intervalCode: 'Hour'
      }
    ];
  }
  if (value.payType === 'monthly') {
    output.basisCode = 'Salaried';
    output.ranges = [
      {
        intervalCode: 'Month'
      }
    ];
  }
  if (value.payType === 'yearly') {
    output.basisCode = 'Salaried';
    output.ranges = [
      {
        intervalCode: 'Year'
      }
    ];
  }
  if (value.payType === 'yearlyBonus') {
    output.basisCode = 'SalariedPlusCommission';
    output.ranges = [
      {
        intervalCode: 'Year'
      }
    ];
  }
  if (value.description) {
    output.descriptions = [value.description];
  }
  if (!Number.isNaN(Number(value.minimumAmount))) {
    if (!output.ranges) {
      output.ranges = [{}];
    }
    output.ranges[0].minimumAmount = { value: value.minimumAmount, currency: value.currency };
  }
  if (!Number.isNaN(Number(value.maximumAmount))) {
    if (!output.ranges) {
      output.ranges = [{}];
    }
    output.ranges[0].maximumAmount = { value: value.maximumAmount, currency: value.currency };
  }

  return output;
};

export default transformSalary;
