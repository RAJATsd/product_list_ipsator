import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

const categorys = [
  "smartphones",
  "laptops",
  "fragrances",
  "skincare",
  "home-decoration",
  "groceries",
  "furniture",
  "tops",
  "womens-dresses",
  "womens-shoes",
  "mens-shirts",
  "mens-shoes",
];

interface FilterProps {
  sortValue: string;
  onSortValueChange: (val: string) => void;
  categoryValue: string;
  oncategoryChange: Dispatch<SetStateAction<string>>;
}

const Filters = ({
  sortValue,
  onSortValueChange,
  categoryValue,
  oncategoryChange,
}: FilterProps) => {
  return (
    <div className="flex w-full justify-end p-2">
      <FormControl size="small" sx={{ m: 1, minWidth: 160 }}>
        <InputLabel id="sort-select-label">Sort By</InputLabel>
        <Select
          labelId="sort-select-label"
          value={sortValue}
          label="Sort By"
          onChange={(evt) => onSortValueChange(evt.target.value)}
          size="small"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="price_asc">Price Ascending</MenuItem>
          <MenuItem value="price_dsc">Price Descending</MenuItem>
        </Select>
      </FormControl>
      <FormControl size="small" sx={{ m: 1, minWidth: 160 }}>
        <InputLabel id="category-select-label">Category</InputLabel>
        <Select
          labelId="category-select-label"
          value={categoryValue}
          label="category"
          onChange={(evt) => oncategoryChange(evt.target.value)}
          size="small"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {categorys.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default Filters;
