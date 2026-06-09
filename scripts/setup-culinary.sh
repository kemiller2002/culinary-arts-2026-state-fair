#!/usr/bin/env bash
set -euo pipefail

ROOT="culinary"

slugify () {
  echo "$1" \
    | tr '[:upper:]' '[:lower:]' \
    | sed 's/&/and/g' \
    | sed 's/[^a-z0-9]/-/g' \
    | sed 's/-\+/-/g' \
    | sed 's/^-//' \
    | sed 's/-$//'
}

create_class () {
  local division="$1"
  local category="$2"
  local class_number="$3"
  local class_name="$4"

  local category_slug
  local class_slug
  category_slug="$(slugify "$category")"
  class_slug="$(slugify "$class_name")"

  local path="$ROOT/entries/$division/$category_slug/${class_number}-${class_slug}"

  mkdir -p "$path"

  cat > "$path/_class.yml" <<EOF
division: $division
category: $category
classNumber: $class_number
className: $class_name
EOF
}

mkdir -p "$ROOT"/{people,entries,templates,output}

cat > "$ROOT/people/household.yml" <<'EOF'
id: household
address: 6530 N. Ewing St.
city: Indianapolis
state: IN
zip: 46220
email: samanthakevinmiller@gmail.com
EOF

cat > "$ROOT/people/kevin.yml" <<'EOF'
id: kevin
name: Kevin Miller
household: household
phone: 317-450-0255
division: adult
EOF

cat > "$ROOT/people/samantha.yml" <<'EOF'
id: samantha
name: Samantha Miller
household: household
phone: 317-616-8714
division: adult
EOF

cat > "$ROOT/people/colin.yml" <<'EOF'
id: colin
name: Colin Miller
household: household
phone: 317-616-8714
division: youth
grade:
EOF

# Adult Culinary Arts

create_class adult "Dehydrated" 001 "Fruits"
create_class adult "Dehydrated" 002 "Vegetables"
create_class adult "Dehydrated" 003 "Herbs"

create_class adult "Jellies" 004 "Any Single Berry"
create_class adult "Jellies" 005 "Any Single Fruit"
create_class adult "Jellies" 006 "Multiple Fruit"
create_class adult "Jellies" 007 "Other than Above"

create_class adult "Jams and Preserves" 008 "Blackberry"
create_class adult "Jams and Preserves" 009 "Peach"
create_class adult "Jams and Preserves" 010 "Black Raspberry and Red Raspberry"
create_class adult "Jams and Preserves" 011 "Marmalades"
create_class adult "Jams and Preserves" 012 "Strawberry"
create_class adult "Jams and Preserves" 013 "Mixed Fruit"
create_class adult "Jams and Preserves" 014 "Any Berry Jam"
create_class adult "Jams and Preserves" 015 "Pepper Jelly Preserves"
create_class adult "Jams and Preserves" 016 "Other than Above"

create_class adult "Butters" 017 "Any Fruit Butter Flavor"

create_class adult "Pickles" 018 "Bread and Butter"
create_class adult "Pickles" 019 "Dill"
create_class adult "Pickles" 020 "Other than Above"

create_class adult "Relishes" 021 "Corn"
create_class adult "Relishes" 022 "Sweet"
create_class adult "Relishes" 023 "Salsa Not Fresh"
create_class adult "Relishes" 024 "Other than Above"

create_class adult "Canned Fruits and Canned Vegetables" 025 "Fruit Based Sauce"
create_class adult "Canned Fruits and Canned Vegetables" 026 "Fruit or Pie Filling"
create_class adult "Canned Fruits and Canned Vegetables" 027 "Vegetables"

create_class adult "Sauces" 028 "Tomato Based Sauce"
create_class adult "Sauces" 029 "Barbecue Sauce"
create_class adult "Sauces" 030 "Other than Above"

create_class adult "Dips or Spreads" 031 "Dip for Fruit"
create_class adult "Dips or Spreads" 032 "Dip for Vegetables"
create_class adult "Dips or Spreads" 033 "Dip for Chip Excluding Salsa"
create_class adult "Dips or Spreads" 034 "Hummus Dip"
create_class adult "Dips or Spreads" 035 "Cheese Dip"
create_class adult "Dips or Spreads" 036 "Fresh Salsa"

create_class adult "Brownies" 037 "Brownies Not Frosted"
create_class adult "Brownies" 038 "Frosted Brownies"
create_class adult "Brownies" 039 "Brownies Containing Nuts"
create_class adult "Brownies" 040 "Caramel Brownies"
create_class adult "Brownies" 041 "Peanut Butter Brownies"
create_class adult "Brownies" 042 "Other than Above"

create_class adult "Specialty Diet" 043 "Cookies Gluten Free"
create_class adult "Specialty Diet" 044 "Cakes Gluten Free"
create_class adult "Specialty Diet" 045 "Other than Above or Vegan and Low or No Sugar"

create_class adult "Candy" 046 "Chocolate Fudge"
create_class adult "Candy" 047 "Peanut Butter Fudge"
create_class adult "Candy" 048 "Any Other Fudge"
create_class adult "Candy" 049 "English Toffee"
create_class adult "Candy" 050 "Caramel Corn"
create_class adult "Candy" 051 "Caramels No Chocolate Coating"
create_class adult "Candy" 052 "Brittle"
create_class adult "Candy" 053 "Chocolate Covered Candies"
create_class adult "Candy" 054 "Other than Above"
create_class adult "Candy" 055 "Microwave Candy"

create_class adult "Cookies" 056 "Chocolate Chip Without Nuts"
create_class adult "Cookies" 057 "Chocolate Chip With Nuts"
create_class adult "Cookies" 058 "Coconut Macaroons"
create_class adult "Cookies" 059 "Lemon or Lime"
create_class adult "Cookies" 060 "Filled or Sandwich"
create_class adult "Cookies" 061 "Ginger"
create_class adult "Cookies" 062 "Biscotti"
create_class adult "Cookies" 063 "Crinkle Cookies"
create_class adult "Cookies" 064 "Mexican Wedding Cake"
create_class adult "Cookies" 065 "Nut"
create_class adult "Cookies" 066 "Oatmeal"
create_class adult "Cookies" 067 "Orange"
create_class adult "Cookies" 068 "Peanut Butter"
create_class adult "Cookies" 069 "Pineapple"
create_class adult "Cookies" 070 "Holiday Cookies"
create_class adult "Cookies" 071 "Sugar Not Iced"
create_class adult "Cookies" 072 "Unbaked"
create_class adult "Cookies" 073 "Molasses"
create_class adult "Cookies" 074 "Snickerdoodle"
create_class adult "Cookies" 075 "Butter Shortbread Cookie"
create_class adult "Cookies" 076 "Other than Above"

create_class adult "Bar Desserts" 077 "Pumpkin or Zucchini Bars"
create_class adult "Bar Desserts" 078 "Fruit Bars"
create_class adult "Bar Desserts" 079 "Lemon Bars"
create_class adult "Bar Desserts" 080 "Blonde Brownies Must Contain Brown Sugar"
create_class adult "Bar Desserts" 081 "Layered Bars With Nuts Fruit Chips Etc"
create_class adult "Bar Desserts" 082 "Other than Above Refrigerated No Bake or Cookie Bars"

create_class adult "Yeast Bread" 083 "White Classic French"
create_class adult "Yeast Bread" 084 "Whole Wheat"
create_class adult "Yeast Bread" 085 "Raisin and or Cinnamon"
create_class adult "Yeast Bread" 086 "Specialty Flavored Bread"
create_class adult "Yeast Bread" 087 "Other Grains"
create_class adult "Yeast Bread" 088 "Bread Machine"

create_class adult "Sourdough Bread" 089 "Any Sourdough Loaf"

create_class adult "Yeast Rolls" 090 "Dinner Rolls Any Shape"
create_class adult "Yeast Rolls" 091 "Whole Wheat or Whole Grain"
create_class adult "Yeast Rolls" 092 "Cinnamon Rolls"
create_class adult "Yeast Rolls" 093 "Other than Above"

create_class adult "Quick Breads" 094 "Zucchini Loaf"
create_class adult "Quick Breads" 095 "Banana Loaf"
create_class adult "Quick Breads" 096 "Banana Nut Loaf"
create_class adult "Quick Breads" 097 "Pumpkin Loaf"
create_class adult "Quick Breads" 098 "Muffins"
create_class adult "Quick Breads" 099 "Scones"
create_class adult "Quick Breads" 100 "Coffee Cakes"
create_class adult "Quick Breads" 101 "Other than Above Includes Biscuits Turnovers"

create_class adult "Honey Foods" 102 "Honey Cookies"
create_class adult "Honey Foods" 103 "Honey Breads"
create_class adult "Honey Foods" 104 "Honey Cakes"
create_class adult "Honey Foods" 105 "Honey Pies"
create_class adult "Honey Foods" 106 "Other than Above Honey Food"

create_class adult "Create with a Mix" 107 "Cookies"
create_class adult "Create with a Mix" 108 "Brownies"
create_class adult "Create with a Mix" 109 "Breads Quick or Yeast"
create_class adult "Create with a Mix" 110 "Cakes"
create_class adult "Create with a Mix" 111 "Other than Above"

create_class adult "American Dairy Association Indiana Dairy Foods" 112 "Cookies Plate of 6"
create_class adult "American Dairy Association Indiana Dairy Foods" 113 "Candy Plate of 9 Pieces"
create_class adult "American Dairy Association Indiana Dairy Foods" 114 "Quick Bread One Standard Loaf"

create_class adult "International Baked Foods" 115 "Cookies"
create_class adult "International Baked Foods" 116 "Yeast Breads Sweet or Savory"
create_class adult "International Baked Foods" 117 "Cakes"
create_class adult "International Baked Foods" 118 "Pastries"
create_class adult "International Baked Foods" 119 "Other than Above Baked Food"

create_class adult "Non Professional Cake Decorating" 120 "Special Occasion"

create_class adult "Cake Decorating Competition Theme" 121 "A Celebration of Baseball"
create_class adult "Cake Decorating Competition Theme" 122 "America 250th Birthday Theme"

create_class adult "Cookie Decorating Competition Theme" 123 "A Celebration of Baseball"
create_class adult "Cookie Decorating Competition Theme" 124 "America 250th Birthday Theme"

create_class adult "Cookie Decorating Competition" 125 "Special Occasion"

create_class adult "Single Layer Cakes" 126 "Pound"
create_class adult "Single Layer Cakes" 127 "Gingerbread"
create_class adult "Single Layer Cakes" 128 "Fruit or Nut"
create_class adult "Single Layer Cakes" 129 "Chocolate"
create_class adult "Single Layer Cakes" 130 "Other than Above"

create_class adult "Multiple Layer Cakes" 132 "Spice or Nut"
create_class adult "Multiple Layer Cakes" 133 "Cherry or Other Fruit"
create_class adult "Multiple Layer Cakes" 134 "Coconut"
create_class adult "Multiple Layer Cakes" 135 "Chocolate"
create_class adult "Multiple Layer Cakes" 136 "White or Yellow"
create_class adult "Multiple Layer Cakes" 137 "Other than Above"

create_class adult "Cheesecake" 138 "Any Cheesecake"
create_class adult "Ugly Cakes" 139 "Ugly Cake"

create_class adult "Pies" 140 "Dutch Apple"
create_class adult "Pies" 141 "Apple"
create_class adult "Pies" 142 "Blackberry"
create_class adult "Pies" 143 "Blueberry"
create_class adult "Pies" 144 "Multiple Berry"
create_class adult "Pies" 145 "Cherry"
create_class adult "Pies" 146 "Chocolate Brownie or Fudge"
create_class adult "Pies" 147 "Multiple Fruit"
create_class adult "Pies" 148 "Peach"
create_class adult "Pies" 149 "Pecan"
create_class adult "Pies" 150 "Pineapple"
create_class adult "Pies" 151 "Rhubarb"
create_class adult "Pies" 152 "Strawberry"
create_class adult "Pies" 153 "Other Single Fruit Pie Non Refrigerated"
create_class adult "Pies" 154 "Other than Above Non Refrigerated"
create_class adult "Pies" 155 "Coconut Cream"
create_class adult "Pies" 156 "Hoosier Sugar Cream"
create_class adult "Pies" 157 "Fruit Cream Pie"
create_class adult "Pies" 158 "Pumpkin or Sweet Potato"
create_class adult "Pies" 159 "Other Cream Pie"

# Youth Culinary Arts

create_class youth "Cookies" 001 "6 Drop Molded or Bar Cookies"
create_class youth "Brownies" 002 "Brownies Frosted or Unfrosted"
create_class youth "Cakes" 003 "Single or Multiple Layer Cake"
create_class youth "Cakes" 004 "A Celebration of Baseball"
create_class youth "Cakes" 005 "America 250th Birthday Theme"

# Sponsored Culinary Contests

create_class sponsored "Youth King Arthur Baking Company Contest" 001 "King Arthur Baking Company Recipe Contest"
create_class sponsored "King Arthur Baking Company Contest" 002 "Marble Cake with Vanilla Buttercream Frosting"
create_class sponsored "Burtons Maplewood Farm Cooking with Maple Syrup" 003 "Cooking with Maple Syrup"
create_class sponsored "Cupcakes" 004 "Red Velvet Cupcake Contest"

cat > "$ROOT/templates/entry.yml" <<'EOF'
personId:

entryNumber:
category:
classNumber:
className:

recipe:
  title:
  servings:
  prepTime:

status: idea
notes:
EOF

cat > "$ROOT/templates/recipe.md" <<'EOF'
# Recipe Title

## Ingredients

-

## Directions

1.

## Notes

-
EOF

cat > "$ROOT/templates/checklist.md" <<'EOF'
# Entry Checklist

- [ ] Recipe typed on 8 1/2 x 11 sheet
- [ ] Entry # included
- [ ] Category name included
- [ ] Class number and class name included
- [ ] Ingredients include quantities
- [ ] Directions complete
- [ ] Servings listed
- [ ] Prep time listed
- [ ] Entrant name included at bottom
- [ ] Address included at bottom
- [ ] Phone number included at bottom
- [ ] Correct quantity prepared
- [ ] Correct plate/container used
- [ ] Entry tag attached correctly
EOF

cat > "$ROOT/README.md" <<'EOF'
# Indiana State Fair Culinary Entries

This folder tracks possible culinary entries by division, category, and class.

The fair-required recipe header is:

```text
Entry #
Category Name
Class Number and Class Name