// Import React Components
import React, { useEffect, useState } from "react";
import axios from "axios";

// SERVICES
import api from "@/api/context/config";
import { categoryProductServices } from "@/api/services/master/category";

// Import Ant Design's Components
import { Button, Divider, Row, Select, Space } from "antd";
import { BiRefresh } from "react-icons/bi";
import { masterPaymentServices } from "@/api/services/master/payment";

// INTERFACE
interface MasterProps {
  prov: string;
  isDisable?: boolean;
  getProvince: (value: any) => void;
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
export default function MasterProvince({
  getProvince,
  prov,
  isDisable,
  children,
}: MasterProps) {
  // STATE MANAGEMENT
  const [province, setProvince] = useState<number | null>(null);
  const [optionValue, setOptionValue] = useState<CategoryOption[]>([]);
  // Loading
  const [isLoading, setIsLoading] = useState(false);

  // Fetch Data
  const fetchData = async () => {
    setIsLoading(true);

    try {
      const result: any = await api.get(
        `https://alamat.thecloudalert.com/api/provinsi/get`
      );

      console.log("Fetch res: ", result);

      if (result?.data?.result?.length > 0) {
        const _res = result.data.result;

        const _filtered = _res.filter((val: any) => {
          return !val?.is_deleted;
        });

        const optionFilter: CategoryOption[] = _filtered.map((value: any) => ({
          id: value?.id,
          key: value?.id,
          value: value?.text,
          label: value?.text,
          code: value?.code,
        }));

        setOptionValue(optionFilter);
        setProvince(null);
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

    if (prov && optionValue.length > 0 && !cleanUp) {
      setIsLoading(true);
      // console.log(category);
      handleEdit(prov, optionValue);
    } else {
      setProvince(null);
    }

    return () => {
      cleanUp = true;
    };
  }, [prov, optionValue]);

  // Handle Change
  const handleChange = (val: number, all: any) => {
    const _value = val;
    const _allKeys = all;

    // console.log("INI CODE ", _allKeys);

    setProvince(_value);
    getProvince({
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

    setProvince(_names);

    setIsLoading(false);
  };

  // Handle Change
  const handleClear = () => {
    setProvince(null);
  };

  return (
    <Select
      className="province-select"
      key="province-select"
      allowClear
      showSearch
      disabled={isDisable}
      value={province}
      placeholder="Select a Province!"
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
