// index.tsx
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Select, Table, Spin } from "antd";
import type { DatatableProps } from "@/core/data/interface";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { FixedSizeList as List } from "react-window";
import type { TableRowSelection } from "antd/es/table/interface";
import Link from "next/link";

const { Option } = Select;

const Datatable: React.FC<DatatableProps> = ({
  columns,
  dataSource,
  Selection,
  searchText,
  isLoading = false,
  defaultPageSize = 10,
  serverPagination = false,
  totalCount,
  currentPage,
  onPageChange,
}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [Selections, setSelections] = useState<boolean>(true);
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const [current, setCurrent] = useState(currentPage || 1);

  const listHeight = 600;
  const rowHeight = 60;

  const debouncedSearchText = useDebouncedValue(searchText, 300);

  useEffect(() => {
    if (currentPage !== undefined) {
      setCurrent(currentPage);
    }
  }, [currentPage]);

  useEffect(() => {
    if (defaultPageSize !== undefined) {
      setPageSize(defaultPageSize);
    }
  }, [defaultPageSize]);

  useEffect(() => {
    setSelections(Boolean(Selection));
  }, [Selection]);

  // Memoize filtering
  const filteredDataSource = useMemo(() => {
    if (serverPagination) return dataSource;
    if (!debouncedSearchText) return dataSource;
    return dataSource.filter((record) =>
      Object.values(record).some((field) =>
        String(field).toLowerCase().includes(debouncedSearchText.toLowerCase())
      )
    );
  }, [debouncedSearchText, dataSource, serverPagination]);

  useEffect(() => {
    if (!serverPagination) {
      setCurrent(1); // Reset to first page on client search
    }
  }, [debouncedSearchText, dataSource, serverPagination]);

  const onSelectChange = useCallback((newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  }, []);

  const rowSelection: TableRowSelection<any> = useMemo(
    () => ({
      selectedRowKeys,
      onChange: onSelectChange,
    }),
    [selectedRowKeys, onSelectChange]
  );

  const handlePageChange = useCallback(
    (page: number, newPageSize: number) => {
      setCurrent(page);
      setPageSize(newPageSize);
      if (onPageChange) {
        onPageChange(page, newPageSize);
      }
    },
    [onPageChange]
  );

  const paginatedData = useMemo(() => {
    if (serverPagination) {
      return dataSource.map((record, idx) => {
        if (record && (record.key === undefined || record.key === null)) {
          const fallback =
            record.id !== undefined && record.id !== null
              ? String(record.id)
              : `dt-row-${(current - 1) * pageSize + idx}`;
          return { ...record, key: fallback };
        }
        return record;
      });
    }

    const slice = filteredDataSource.slice(
      (current - 1) * pageSize,
      current * pageSize
    );
    return slice.map((record, idx) => {
      if (record && (record.key === undefined || record.key === null)) {
        const fallback =
          record.id !== undefined && record.id !== null
            ? String(record.id)
            : `dt-row-${(current - 1) * pageSize + idx}`;
        return { ...record, key: fallback };
      }
      return record;
    });
  }, [filteredDataSource, dataSource, current, pageSize, serverPagination]);

  // Helper to render a single row for react-window
  const Row = ({
    index,
    style,
  }: {
    index: number;
    style: React.CSSProperties;
  }) => {
    const record = paginatedData[index];
    if (!record) return null;

    return (
      <div style={style} className="virtual-row d-flex">
        {Selections && (
          <div style={{ width: "50px", padding: "8px", flexShrink: 0 }}>
            <input
              type="checkbox"
              checked={selectedRowKeys.includes(record.key || index)}
              onChange={(e) => {
                const newKeys = e.target.checked
                  ? [...selectedRowKeys, record.key || index]
                  : selectedRowKeys.filter(
                      (key) => key !== (record.key || index)
                    );
                onSelectChange(newKeys);
              }}
            />
          </div>
        )}
        {columns.map((column, colIndex) => (
          <div key={colIndex} style={{ padding: "8px", flex: 1 }}>
            {column.render
              ? column.render(record[column.dataIndex as string], record, index)
              : record[column.dataIndex as string]}
          </div>
        ))}
      </div>
    );
  };

  const effectiveTotal = serverPagination
    ? totalCount !== undefined
      ? totalCount
      : dataSource.length
    : filteredDataSource.length;
  const totalPages = Math.max(1, Math.ceil(effectiveTotal / pageSize));

  return (
    <div className="row align-items-center">
      {/* Table */}
      <div aria-busy={isLoading}>
        {isLoading ? (
          <div
            className="w-100 d-flex justify-content-center align-items-center"
            style={{ minHeight: 240 }}
          >
            <Spin size="large" tip="Loading data..." />
          </div>
        ) : (
          (() => {
            const visibleCount = Math.floor(listHeight / rowHeight);
            const shouldVirtualize = paginatedData.length > visibleCount * 2;
            return shouldVirtualize ? (
              <div className="table-responsive">
                <div
                  className="table table-nowrap mb-3"
                  style={{ width: "100%" }}
                >
                  {/* Header */}
                  <div
                    className="d-flex bg-light border-bottom"
                    style={{ height: rowHeight }}
                  >
                    {Selections && (
                      <div
                        style={{ width: "50px", padding: "8px", flexShrink: 0 }}
                      >
                        Select
                      </div>
                    )}
                    {columns.map((column, index) => (
                      <div
                        key={index}
                        style={{ padding: "8px", flex: 1, fontWeight: "bold" }}
                      >
                        {column.title}
                      </div>
                    ))}
                  </div>
                  {/* Virtual scrolling body */}
                  <List
                    height={listHeight}
                    itemCount={paginatedData.length}
                    itemSize={rowHeight}
                    width="100%"
                  >
                    {Row}
                  </List>
                </div>
              </div>
            ) : (
              <Table
                className="table-nowrap mb-4"
                rowSelection={Selections ? rowSelection : undefined}
                columns={columns}
                rowHoverable={false}
                dataSource={paginatedData}
                pagination={false}
                rowKey={(record: any) =>
                  record?.key !== undefined && record?.key !== null
                    ? String(record.key)
                    : record?.id !== undefined && record?.id !== null
                    ? String(record.id)
                    : record?.Number !== undefined && record?.Tax_Name !== undefined
                    ? `tax-${record.Number}-${record.Tax_Name}`
                    : String(record?.Customer_ID || record?.salesId || record?.orderId || "row")
                }
              />
            );
          })()
        )}
      </div>
      {/* Left side: show entries */}
      <div className="col-md-6">
        <div className="datatable-length d-flex align-items-center">
          <label htmlFor="page-size-select" className="mb-0 d-flex align-items-center">
            <span>Show</span>
            <Select
              id="page-size-select"
              value={pageSize}
              onChange={(value) => handlePageChange(1, value)} // reset to page 1
              style={{ width: 70, margin: "0 8px" }}
              size="small"
              aria-label="Select number of results per page"
            >
              <Option value={10}>10</Option>
              <Option value={20}>20</Option>
              <Option value={25}>25</Option>
              <Option value={50}>50</Option>
              <Option value={100}>100</Option>
            </Select>
            <span>entries</span>
          </label>
          <span className="text-muted ms-3 fs-13">
            {effectiveTotal > 0
              ? `(Showing ${Math.min((current - 1) * pageSize + 1, effectiveTotal)} to ${Math.min(
                  current * pageSize,
                  effectiveTotal
                )} of ${effectiveTotal} entries)`
              : "(0 entries)"}
          </span>
        </div>
      </div>

      {/* Right side: pagination */}
      <div className="col-md-6 d-flex justify-content-end align-items-center">
        {/* Custom Bootstrap-style Pagination */}
        <nav aria-label="Data table pagination">
          <ul className="pagination mb-0" role="list">
            {/* Prev button */}
            <li
              key="paginate-btn-prev"
              className={`paginate_button page-item previous${
                current <= 1 ? " disabled" : ""
              }`}
              id="DataTables_Table_0_previous"
            >
              <Link
                href="#"
                className="page-link"
                aria-disabled={current <= 1}
                role="link"
                data-dt-idx="previous"
                tabIndex={current <= 1 ? -1 : 0}
                onClick={(e) => {
                  e.preventDefault();
                  if (current > 1) handlePageChange(current - 1, pageSize);
                }}
                style={{ cursor: current <= 1 ? "not-allowed" : "pointer" }}
                aria-label="Go to previous page"
              >
                <i className="icon-chevron-left me-1"></i> Prev
              </Link>
            </li>
            {/* Page numbers */}
            {(() => {
              const pages: (number | string)[] = [];
              if (totalPages <= 7) {
                for (let i = 1; i <= totalPages; i++) pages.push(i);
              } else {
                pages.push(1);
                if (current > 3) pages.push("...");
                const start = Math.max(2, current - 1);
                const end = Math.min(totalPages - 1, current + 1);
                for (let i = start; i <= end; i++) pages.push(i);
                if (current < totalPages - 2) pages.push("...");
                pages.push(totalPages);
              }

              return pages.map((pageNum, idx) => {
                if (pageNum === "...") {
                  return (
                    <li
                      key={`paginate-ellipsis-${idx}`}
                      className="paginate_button ms-2 page-item disabled"
                    >
                      <span className="page-link">...</span>
                    </li>
                  );
                }

                const num = pageNum as number;
                return (
                  <li
                    key={`paginate-page-num-${num}`}
                    className={`paginate_button ms-2 page-item${
                      current === num ? " active" : ""
                    }`}
                    role="listitem"
                  >
                    <Link
                      href="#"
                      className="page-link page-number"
                      role="link"
                      aria-current={current === num ? "page" : undefined}
                      data-dt-idx={num}
                      tabIndex={0}
                      onClick={(e) => {
                        e.preventDefault();
                        if (current !== num)
                          handlePageChange(num, pageSize);
                      }}
                      aria-label={`Go to page ${num}`}
                    >
                      {num}
                    </Link>
                  </li>
                );
              });
            })()}
            {/* Next button */}
            <li
              key="paginate-btn-next"
              className={`paginate_button page-item ms-2 next${
                current >= totalPages || effectiveTotal === 0 ? " disabled" : ""
              }`}
              id="DataTables_Table_0_next"
            >
              <Link
                href="#"
                className="page-link"
                aria-disabled={current >= totalPages || effectiveTotal === 0}
                role="link"
                data-dt-idx="next"
                tabIndex={current >= totalPages || effectiveTotal === 0 ? -1 : 0}
                onClick={(e) => {
                  e.preventDefault();
                  if (current < totalPages && effectiveTotal > 0)
                    handlePageChange(current + 1, pageSize);
                }}
                style={{
                  cursor:
                    current >= totalPages || effectiveTotal === 0
                      ? "not-allowed"
                      : "pointer",
                }}
                aria-label="Go to next page"
              >
                Next <i className="icon-chevron-right ms-1"></i>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default React.memo(Datatable);
