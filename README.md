# Naurok parser API

## End POINTS:

# \* /

## method: get

## params:

### -topic:topic of searched theme(string)

### -grade:grade to search(number)

### -subjectID:special subjectID(number)

### -questionsQuantity:questionsQuantity(number)

## response:

{
questionsQuantity:string;
linkText:string;
link:string;
}[ ]

# \* /subjects

## method : get

## params:

### no Params

## response:

{
id:number;
subject:string;
}[ ]
