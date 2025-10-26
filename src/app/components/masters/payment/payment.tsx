// Import React Components
import React, { useEffect, useState } from "react";
import axios from "axios";

// SERVICES
import { categoryProductServices } from "@/api/services/master/category";

// Import Ant Design's Components
import { Button, Divider, Row, Select, Space } from "antd";
import { BiRefresh } from "react-icons/bi";
import { masterPaymentServices } from "@/api/services/master/payment";

// INTERFACE
interface MasterProps {
  pay: string;
  isDisable?: boolean;
  getPayment: (value: any) => void;
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
export default function MasterPaymentList({
  getPayment,
  pay,
  isDisable,
  children,
}: MasterProps) {
  // STATE MANAGEMENT
  const [payment, setPayment] = useState<number | null>(null);
  const [optionValue, setOptionValue] = useState<CategoryOption[]>([]);
  // Loading
  const [isLoading, setIsLoading] = useState(false);

  // Fetch Data
  const fetchData = async () => {
    setIsLoading(true);

    try {
      const result = await masterPaymentServices.getAll();

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
          label: value?.payment_name,
          code: value?.payment_code,
        }));

        setOptionValue(optionFilter);
        setPayment(null);
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

    if (pay && optionValue.length > 0 && !cleanUp) {
      setIsLoading(true);
      // console.log(category);
      handleEdit(pay, optionValue);
    } else {
      setPayment(null);
    }

    return () => {
      cleanUp = true;
    };
  }, [pay, optionValue]);

  // Handle Change
  const handleChange = (val: number, all: any) => {
    const _value = val;
    const _allKeys = all;

    // console.log("INI CODE ", _allKeys);

    setPayment(_value);
    getPayment({
      value: _allKeys?.label,
      id: _allKeys?.id,
      code: _allKeys?.code,
    });
  };

  // Handle Edit
  const handleEdit = (names: any, allKey: any) => {
    let _names = allKey.filter((val: any) => {
      return val?.id == names;
    });

    console.log("Value Edit: ", _names);

    setPayment(_names);

    setIsLoading(false);
  };

  // Handle Change
  const handleClear = () => {
    setPayment(null);
  };

  return (
    <Select
      className="payment-select"
      key="payment-select"
      allowClear
      showSearch
      disabled={isDisable}
      value={payment}
      placeholder="Select Payment Type!"
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
