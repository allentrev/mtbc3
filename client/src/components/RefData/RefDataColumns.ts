import { ColumnDescriptor } from "../../components/MaintainEntityManager";
import { RefDataRecord } from "../../utilities/refDataUtils";

export function getRefDataColumns(): ColumnDescriptor<RefDataRecord>[] {
    return [
        {
            key: "webPage",
            label: "WebPage",
            align: "center",
            optional: false,
        },
        {
            key: "refKey",
            label: "Key",
            align: "center",
            optional: false,
        },
        {
            key: "name",
            label: "Name",
            align: "center",
            optional: false,
        },
        {
            key: "value",
            label: "Value",
            align: "center",
            optional: true,
        },
    ];
}
