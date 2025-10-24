// Import React Components
import React, { useEffect, useState } from "react";
import axios from "axios";

// SERVICES
import { categoryProductServices } from "@/api/services/master/category";

// Import Ant Design's Components
import { Button, Divider, Row, Select, Space } from "antd";
import { BiRefresh } from "react-icons/bi";

// INTERFACE
interface MasterProps {
  category: string;
  isDisable?: boolean;
  getCategory: (value: any) => void;
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
export default function MasterCategoryProduct({
  getCategory,
  category,
  isDisable,
  children,
}: MasterProps) {
  // STATE MANAGEMENT
  const [categories, setCategories] = useState<number | null>(null);
  const [optionValue, setOptionValue] = useState<CategoryOption[]>([]);
  // Loading
  const [isLoading, setIsLoading] = useState(false);

  // Fetch Data
  const fetchData = async () => {
    setIsLoading(true);

    try {
      const result = await categoryProductServices.getAll();

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
          label: value?.category_name,
          code: value?.code,
        }));

        setOptionValue(optionFilter);
        setCategories(null);
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

    if (category && optionValue.length > 0 && !cleanUp) {
      setIsLoading(true);
      // console.log(category);
      handleEdit(category, optionValue);
    } else {
      setCategories(null);
    }

    return () => {
      cleanUp = true;
    };
  }, [category, optionValue]);

  // Handle Change
  const handleChange = (val: number, all: any) => {
    const _value = val;
    const _allKeys = all;

    // console.log("INI CODE ", _allKeys);

    setCategories(_value);
    getCategory({
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

    setCategories(_names);

    setIsLoading(false);
  };

  // Handle Change
  const handleClear = () => {
    setCategories(null);
  };

  return (
    <Select
      className="roles-select"
      key="roles-select"
      allowClear
      showSearch
      disabled={isDisable}
      value={categories}
      placeholder="Select Product's Category"
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
