interface R_T_DATA {
    iconName: string,
    dataName: string,
    realData: string | number,
    unit: string
}
export interface PROP_CONT {
    title: string,
    deviceImg: string,
    cont_data: R_T_DATA[],
}