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
  prov_id: any;
  getCity: (value: any) => void;
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
export default function MasterCity({
  getCity,
  prov,
  prov_id,
  isDisable,
  children,
}: MasterProps) {
  // STATE MANAGEMENT
  const [city, setCity] = useState<number | null>(null);
  const [optionValue, setOptionValue] = useState<CategoryOption[]>([]);
  // Loading
  const [isLoading, setIsLoading] = useState(false);

  // Fetch Data
  const fetchData = async (ids: any) => {
    setIsLoading(true);

    try {
      const result: any = await api.get(
        `https://alamat.thecloudalert.com/api/kabkota/get/?d_provinsi_id=${ids}`
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
        setCity(null);
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
    if (prov_id) {
      fetchData(prov_id);
    }
  }, [prov_id]);

  useEffect(() => {
    let cleanUp = false;

    if (prov && optionValue.length > 0 && !cleanUp) {
      setIsLoading(true);
      // console.log(category);
      handleEdit(prov, optionValue);
    } else {
      setCity(null);
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

    setCity(_value);
    getCity({
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

    setCity(_names);

    setIsLoading(false);
  };

  // Handle Change
  const handleClear = () => {
    setCity(null);
  };

  return (
    <Select
      className="city-select"
      key="city-select"
      allowClear
      showSearch
      disabled={isDisable}
      value={city}
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
            <Button
              type="text"
              icon={<BiRefresh />}
              onClick={() => fetchData(prov_id)}
            >
              Refresh
            </Button>
          </Row>
        </>
      )}
    />
  );
}
