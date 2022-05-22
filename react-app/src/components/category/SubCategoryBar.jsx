/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';

import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import categorys from '../../public/category';

function SortButton(props) {
  const { sortBy, setSortBy, value, name } = props;

  const buttonAction = () => {
    if (value === sortBy.type) {
      setSortBy({ type: sortBy.type, asc: !sortBy.asc });
    } else {
      setSortBy({ type: value, asc: true });
    }
  };

  return (
    <Box sx={{ marginRight: 1 }}>
      <Button
        variant={value === sortBy.type ? 'contained' : 'outlined'}
        disableElevation
        size="small"
        onClick={() => {
          buttonAction();
        }}
        sx={{ borderRadius: 50 }}
      >
        <Typography noWrap>{name}</Typography>
        {value === sortBy.type && !sortBy.asc ? (
          <KeyboardArrowDownIcon />
        ) : (
          <KeyboardArrowUpIcon />
        )}
      </Button>
    </Box>
  );
}

function CategoryButton(props) {
  const { subCategory, setSubCategory, value, name } = props;

  const buttonAction = () => {
    if (value === subCategory) {
      setSubCategory('');
    } else {
      setSubCategory(value);
    }
  };

  return (
    <Box sx={{ marginRight: 1 }}>
      <Button
        variant={value === subCategory ? 'contained' : 'outlined'}
        disableElevation
        size="small"
        onClick={() => {
          buttonAction();
        }}
        sx={{ borderRadius: 50 }}
      >
        <Typography noWrap>{name}</Typography>
      </Button>
    </Box>
  );
}

function SubCategoryBar(props) {
  const { curCategory, sortBy, setSortBy, subCategory, setSubCategory } = props;

  return (
    <Toolbar
      component="nav"
      sx={{
        overflowX: 'auto',
        flexWrap: 'nowrap',
        minHeight: '40px',
      }}
    >
      <SortButton
        sortBy={sortBy}
        setSortBy={setSortBy}
        value="leftDate"
        name="유통기한"
      />
      <SortButton
        sortBy={sortBy}
        setSortBy={setSortBy}
        value="mfgDate"
        name="제조일자"
      />
      <SortButton
        sortBy={sortBy}
        setSortBy={setSortBy}
        value="consumptionRate"
        name="소모율"
      />
      {Object.entries(categorys[curCategory].subCategory).map(
        ([index, val]) => (
          <CategoryButton
            key={index}
            subCategory={subCategory}
            setSubCategory={setSubCategory}
            value={index}
            name={val.name}
          />
        ),
      )}
    </Toolbar>
  );
}

SubCategoryBar.propTypes = {
  curCategory: PropTypes.string.isRequired,
  sortBy: PropTypes.object.isRequired,
  setSortBy: PropTypes.func.isRequired,
  subCategory: PropTypes.string.isRequired,
  setSubCategory: PropTypes.func.isRequired,
};

export default SubCategoryBar;
