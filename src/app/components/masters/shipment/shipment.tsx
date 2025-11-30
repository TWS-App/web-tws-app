// Import React Components
import React, { useEffect, useState } from "react";

// SERVICES

// Import Ant Design's Components
import { Button, Divider, Row, Select, Space } from "antd";
import { BiRefresh } from "react-icons/bi";
import { masterShipmentServices } from "@/api/services/master/shipment";

// INTERFACE
interface MasterProps {
  status: number;
  isDisable?: boolean;
  getShipment: (value: any) => void;
  children?: React.ReactNode;
}

interface CategoryOption {
  id: number;
  key: number;
  value: number;
  label: string;
  code: string;
}

// CODE
export default function MasterShipment({
  getShipment,
  status,
  isDisable,
  children,
}: MasterProps) {
  // STATE MANAGEMENT
  const [shipment, setShipment] = useState<number | null>(null);
  const [optionValue, setOptionValue] = useState<CategoryOption[]>([]);
  // Loading
  const [isLoading, setIsLoading] = useState(false);

  // Fetch Data
  const fetchData = async () => {
    setIsLoading(true);

    try {
      const result = await masterShipmentServices.getAll();

      // console.log("Fetch res: ", result);

      if (result.length > 0) {
        const _res = result;

        const _filtered = _res.filter((val: any) => {
          return !val?.is_deleted;
        });

        const optionFilter: CategoryOption[] = _filtered.map((value: any) => ({
          id: value?.id,
          key: value?.id,
          value: value?.id,
          label: value?.name,
        }));

        setOptionValue(optionFilter);
        setShipment(null);
      } else {
        setOptionValue([]);
      }
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };

  // Use Effects
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    let cleanUp = false;

    if (status && optionValue.length > 0 && !cleanUp) {
      setIsLoading(true);
      // console.log(category);
      handleEdit(status, optionValue);
    } else {
      setShipment(null);
    }

    return () => {
      cleanUp = true;
    };
  }, [status, optionValue]);

  // Handle Change
  const handleChange = (val: number, all: any) => {
    const _value = val;
    const _allKeys = all;

    // console.log("INI CODE ", _allKeys);

    setShipment(_value);
    getShipment({
      value: _allKeys?.label,
      id: _allKeys?.id,
    });
  };

  // Handle Edit
  const handleEdit = (names: any, allKey: any) => {
    let _names = allKey.filter((val: any) => {
      return val?.id == names;
    });

    console.log("Value Edit: ", _names);

    setShipment(_names);

    setIsLoading(false);
  };

  // Handle Change
  const handleClear = () => {
    setShipment(null);
  };

  return (
    <Select
      className="status-shipment-select"
      key="status-shipment-select"
      allowClear
      showSearch
      disabled={isDisable}
      value={shipment}
      placeholder="Select Shipment!"
      loading={isLoading}
      variant="outlined"
      onChange={handleChange}
      onClear={handleClear}
      options={optionValue}
      popupRender={(menu: any) => (
        <>
          {menu}
          <Divider style={{ margin: "8px 0" }} />
          <Row justify="end" style={{ padding: "0 8px 4px" }}>
            <Button type="text" icon={<BiRefresh />} onClick={fetchData}>
              Refresh
            </Button>
          </Row>
        </>
      )}
    />
  );
}
