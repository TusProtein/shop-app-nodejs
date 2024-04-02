import moment from 'moment-timezone';

const formattedDateOfBirth = (dateOfBirth) => {
    // //Validate Date of Birth
    let formattedDateOfBirth = moment(
        dateOfBirth,
        ['DD/MM/YYYY', 'DD-MM-YYYY'],
        true
    );

    if (!formattedDateOfBirth.isValid()) {
        return null;
    } else {
        return (formattedDateOfBirth =
            formattedDateOfBirth.format('YYYY-MM-DD'));
    }
};

export default formattedDateOfBirth;
