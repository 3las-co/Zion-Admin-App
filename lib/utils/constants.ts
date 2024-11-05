class Constants {
    static readonly adminTypes = [
        { id: 0, label: 'Principal Administrator', value: 'principal' },
        { id: 1, label: 'Standard Administrator', value: 'standard' },
    ];
    static readonly providerTypes = [
        { id: 0, label: 'Medical Doctor', value: 'Medical Doctor' },
        { id: 1, label: 'Registered Nurse', value: 'Registered Nurse' },
        { id: 2, label: 'Nurse Practitioner', value: 'Nurse Practitioner' },
    ];
    static readonly facilityCategories = [
        { id: 0, label: 'Acute', value: 'Acute' },
        { id: 1, label: 'Acute Rehabilitation', value: 'Acute Rehabilitation' },
        { id: 2, label: 'Long Term Acute Care (LTAC)', value: 'Long Term Acute Care' },
        { id: 3, label: 'Skilled Nursing Facility (SNF)', value: 'Skilled Nursing Facility' },
    ];
    static readonly shiftTypes = [
        { id: 0, label: 'Medical Doctor', value: 'Medical Doctor' },
        { id: 1, label: 'Registered Nurse', value: 'Registered Nurse' },
        { id: 2, label: 'Nurse Practitioner', value: 'Nurse Practitioner' },
    ];
}

export default Constants;
