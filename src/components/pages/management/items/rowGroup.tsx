import React, { useState, useEffect } from "react";

interface RowItem {
    id: number;
    size: string;
    price: string;
}

interface Props {
    groupId: string;
}

const DynamicRowGroup: React.FC<Props> = ({ groupId }) => {
    const [rows, setRows] = useState<RowItem[]>([]);

    // 👉 ADD DEFAULT ONE ROW ON FIRST LOAD
    useEffect(() => {
        setRows([{ id: Date.now(), size: "", price: "" }]);
    }, []);

    const addRow = () => {
        setRows((prev) => [
            ...prev,
            { id: Date.now(), size: "", price: "" }
        ]);
    };

    const deleteRow = (id: number) => {
        setRows((prev) => prev.filter((row) => row.id !== id));
    };

    const updateRow = (id: number, field: keyof RowItem, value: string) => {
        setRows((prev) =>
            prev.map((row) =>
                row.id === id ? { ...row, [field]: value } : row
            )
        );
    };

    return (
        <div>
            <div id={groupId} className="rowsContainer">

                {/* Render rows */}
                {rows.map((row) => (
                    <div key={row.id} className="row mb-3">
                        <div className="col-lg-5">
                            <label className="form-label">
                                Size<span className="text-danger"> *</span>
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                value={row.size}
                                onChange={(e) =>
                                    updateRow(row.id, "size", e.target.value)
                                }
                            />
                        </div>

                        <div className="col-lg-5">
                            <label className="form-label">
                                Price<span className="text-danger"> *</span>
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                value={row.price}
                                onChange={(e) =>
                                    updateRow(row.id, "price", e.target.value)
                                }
                            />
                        </div>

                        <div className="col-lg-2 d-flex align-items-center gap-2 mt-4">
                            <button
                                type="button"
                                className="btn btn-icon btn-sm btn-white rounded-circle"
                                onClick={() => deleteRow(row.id)}
                            >
                                <i className="icon-trash-2 text-danger" />
                            </button>
                        </div>
                    </div>
                ))}

            </div>

            {/* Add Button (No Page Refresh) */}
            <button
                type="button"
                className="btn btn-light btn-sm mt-2"
                onClick={addRow}
            >
                <i className="icon-plus" /> Add
            </button>
        </div>
    );
};

export default DynamicRowGroup;
