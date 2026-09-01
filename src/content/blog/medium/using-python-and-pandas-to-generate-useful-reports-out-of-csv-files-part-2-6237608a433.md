---
title: Using Python and Pandas to generate useful reports out of CSV files, part 2
subtitle: "Editor’s Note: Here’s Ong Yi Shen’s second blog post, which is a continuation of his first post. You can read his first post here."
description: "Editor’s Note: Here’s Ong Yi Shen’s second blog post, which is a continuation of his first post. You can read his first post here."
slug: using-python-and-pandas-to-generate-useful-reports-out-of-csv-files-part-2
legacyPath: using-python-and-pandas-to-generate-useful-reports-out-of-csv-files-part-2-6237608a433
canonicalUrl: https://tinkercademy.com/blog/2023/using-python-and-pandas-to-generate-useful-reports-out-of-csv-files-part-2/
sourceMediumUrl: https://medium.com/tinkertanker/using-python-and-pandas-to-generate-useful-reports-out-of-csv-files-part-2-6237608a433
author:
  id: 444f1363f2e7
  name: Ong Yi Shen
  handle: ongyishen24
  profileUrl: https://medium.com/@ongyishen24
publishedAt: 2023-10-13T01:01:42.064Z
updatedAt: 2023-10-13T01:01:48.414Z
tags:
  - name: Python Data Science
    slug: python-data-science
  - name: Data Manipulation
    slug: data-manipulation
  - name: Data Cleaning With Python
    slug: data-cleaning-with-python
  - name: Dataframes Python
    slug: dataframes-python
  - name: Data Analysis Process
    slug: data-analysis-process
license: All rights reserved
rightsStatus: permission-recorded
heroImage: /blog-media/f5d737e7c6d3cdd53c1d005b46461edb51c3d398b7028ed0ace7b37691da0f88.png
heroImageWidth: 1626
heroImageHeight: 408
heroAlt: ""
heroAltDecision: decorative
provenance:
  mediumId: 6237608a433
  publicationId: ca1fc9543b6f
  sourceSha256: ea80030537eeb0e7215b6c11afebde6748926d07da5fdb22e659fd36faa594ef
migration:
  paragraphCount: 61
  imageCount: 3
  embedCount: 0
  altReviewRequired: 0
---

<p><em>Editor’s Note: Here’s Ong Yi Shen’s second blog post, which is a continuation of his first post. You can read his first post </em><em><a href="https://tinkercademy.com/blog/2023/using-python-and-pandas-to-generate-useful-reports-out-of-csv-files-part-1/">here</a></em><em>.</em></p>

<!-- medium-image:1*u1uv_VXeIXWsOSgJWCtjvg.png alt-decision:decorative -->

<img src="/blog-media/f5d737e7c6d3cdd53c1d005b46461edb51c3d398b7028ed0ace7b37691da0f88.png" alt="" width="1626" height="408" loading="lazy" decoding="async" />

<p>Continuing with part 1, I will continue to use the cleaned data from the CSV to create a more detailed report, this time I want to create a report for each individual teacher, with aggregated statistics for each teaching group.</p>

<p>There are a few statistics that I want to include in my CSV file, one of them is the count and percentage of the scores of each rubric. In the responses.csv, students have rated teachers on different criteria with a score from 1 to 4. I also want to include the mean of the teacher and teaching group, the mean of the teaching group as well as the mean of the entire school.</p>

<!-- medium-image:1*9YPRoz9zG9b641VjrR3vXw.png alt-decision:meaningful -->

<img src="/blog-media/8c5f5b0b9d90faa094ec45b5cfdd8104700be8b72f373e35ee22bd71db7205d4.png" alt="Here is an example of what I want the CSV to look like once it is done" width="1406" height="356" loading="lazy" decoding="async" />

<p class="medium-image-caption"><em>Here is an example of what I want the CSV to look like once it is done</em></p>

<p>The handy groupby method is used here again, we do a groupby on “Name of Teacher” and “Teaching Group”. We then iterate through each group.</p>

<p>Let’s start with counting the scores of the rubrics of each group. There is a useful method called value_counts which can be used to get the counts of each unique value of a series.</p>

<p>The rubric columns of the responses contain the score that each respondent has given to a teacher or teaching group.</p>

<!-- medium-image:1*DGWiAXlMawbFb1eT1f15cg.png alt-decision:meaningful -->

<img src="/blog-media/1ffdbcbe98ba725415b48286b44b0192cb183285d70b23626fa96a7b9d2b7973.png" alt="Pandas table of numeric ratings across eight teacher-feedback questions" width="1460" height="650" loading="lazy" decoding="async" />

<p>I first filter the group by rubric_columns so that it is just the dataframe containing the rubric columns, I then use .apply() with the function Series.value_counts, this will get the counts of each unique value in the column. I then use transpose to flip the rows and columns.</p>

```python
group[rubric_columns].apply(pd.Series.value_counts).fillna(0).transpose().convert_dtypes()
```

<p>There is an issue with this though, what happens if in the column there isn’t any score of a particular value? For Series.value_counts, it will only count for each unique value that appears. If a column only contains 2 unique values such as 4 and 3, the dataframe will only contain columns of counts for 4 and 3. I want columns 1 and 2 to still be created but have a count of 0.</p>

<p>I created a new function called add_missing_cols, which takes in a dataframe. If the number of columns in the dataframe is less than 4, it will add in the missing columns and fill the values with 0. This will solve the missing column issue.</p>

```python
def add_missing_cols(df):
  if len(df.columns) <= 4:
    missing_cols = set([1, 2, 3, 4]) - set(df.columns)
    for col in missing_cols:
      df[col] = 0
  return df[[1, 2, 3, 4]]
```

<p>Another thing to consider is I want the percentage for the count to the total counts to appear next to each count, so I created another function to do so.</p>

<p>Percentage takes in a series and using sum(), gets the total counts and then uses it to get the percentage of each count. The result is then concatenated together with the count and a string is returned.</p>

```python
def percentage(x):
  return x.astype(str) + " (" + (x * 100/x.sum()).round(1).astype(str) + "%)"
```

<p>I then apply this function to the 1, 2, 3 and 4 columns</p>

```lua
group[[1, 2, 3, 4]] = group[[1, 2, 3, 4]].apply(lambda x: percentage(x), axis=1)
```

<p>Next up is getting the total number of responses using sum() and storing the results in a new column “Responses”</p>

```python
group.loc[:, "Responses"] = group.apply(lambda x: x.sum(), axis=1)
```

<p>I also get the mean of “Name of Teacher”, “Teaching Group”, “Teaching Group” as well as the mean of the entire school using groupby .</p>

```python
mean = new_df.groupby(["Name of Teacher", "Teaching Group"]).mean(numeric_only = True).transpose().round(2)
tg_mean = new_df.groupby("Teaching Group").mean(numeric_only = True).transpose().round(2)
sch_mean = new_df.mean(numeric_only = True).round(2)
```

<p>I iterate through the different groups of “Name of Teacher”, “Teaching Group”. For each group, count the unique values of the rubrics column and add in missing columns if needed. Then calculate the percentage and concatenate it to the counts.</p>

<p>Apply and sum are used to get the number of responses.</p>

<p>The 3 different dataframes created earlier are used to get the mean, teaching group mean and school mean. By using loc, I can pass in name_tg, which is a “Name of Teacher”, “Teaching Group” tuple to the mean dataframe to get the mean of that particular teacher and teaching group.</p>

<p>I can pass in name_tg[1] which is the teaching group to the tg_mean dataframe to get the mean of that particular teaching group.</p>

<p>I also renamed the columns at the end of each iteration.</p>

```python
mean = new_df.groupby(["Name of Teacher", "Teaching Group"]).mean(numeric_only = True).transpose().round(2)
tg_mean = new_df.groupby("Teaching Group").mean(numeric_only = True).transpose().round(2)
sch_mean = new_df.mean(numeric_only = True).round(2)

for name_tg, group in new_df.groupby(["Name of Teacher", "Teaching Group"]):
    group = group[rubric_columns].apply(pd.Series.value_counts).fillna(0).transpose().convert_dtypes()
    group = add_missing_cols(group)
    group[[1, 2, 3, 4]] = group[[1, 2, 3, 4]].apply(lambda x: percentage(x), axis=1)

    group.loc[:, "Responses"] = group.apply(lambda x: x.sum(), axis=1)
    group.loc[:, "Mean"] = mean.loc[:, name_tg]
    group.loc[:, "Mean (TG)"] = tg_mean.loc[:, name_tg[1]]
    group.loc[:, "Mean (School)"] = sch_mean

    group = group.reset_index()
    group = group.rename(columns = {"index": "Question", 1: "SD = 1", 2: "D = 2", 3: "A = 3", 4: "SA = 4"})
```

<p>There are also 3 columns which allow for open-ended answers in the responses CSV. I want to get those responses and add them below the rubrics in the final CSV.</p>

<p>I convert each of them to a frame and fill in any NaN with Nil</p>

```python
written_response_1 = group.loc[:, "What do you appreciate about your teacher and his/her teaching? For example: Were there lessons or learning activities that you particularly enjoyed?"].to_frame().fillna("Nil")
written_response_2 = group.loc[:, "Are there any challenges you currently face when you are learning this subject, that you would want your teacher to know about? If so, what are they?"].to_frame().fillna("Nil")
written_response_3 = group.loc[:, "What would you like to tell your teacher (e.g. suggestions or ideas), that would allow him/her to help you learn better?"].to_frame().fillna("Nil")
```

<p>This is the final code that generates all the required dataframes. The dataframes are stored in a dictionary which will be used later on when we want to add all of them into the Excel file.</p>

```python
d = collections.defaultdict(dict)

mean = new_df.groupby(["Name of Teacher", "Teaching Group"]).mean(numeric_only = True).transpose().round(2)
tg_mean = new_df.groupby("Teaching Group").mean(numeric_only = True).transpose().round(2)
sch_mean = new_df.mean(numeric_only = True).round(2)

for name_tg, group in new_df.groupby(["Name of Teacher", "Teaching Group"]):

    written_response_1 = group.loc[:, "What do you appreciate about your teacher and his/her teaching? For example: Were there lessons or learning activities that you particularly enjoyed?"].to_frame().fillna("Nil")
    written_response_2 = group.loc[:, "Are there any challenges you currently face when you are learning this subject, that you would want your teacher to know about? If so, what are they?"].to_frame().fillna("Nil")
    written_response_3 = group.loc[:, "What would you like to tell your teacher (e.g. suggestions or ideas), that would allow him/her to help you learn better?"].to_frame().fillna("Nil")

    group = group[rubric_columns].apply(pd.Series.value_counts).fillna(0).transpose().convert_dtypes()
    group = add_missing_cols(group)

    group.loc[:, "Responses"] = group.apply(lambda x: x.sum(), axis=1)
    group.loc[:, "Mean"] = mean.loc[:, name_tg]
    group.loc[:, "Mean (TG)"] = tg_mean.loc[:, name_tg[1]]
    group.loc[:, "Mean (School)"] = sch_mean

    group[[1, 2, 3, 4]] = group[[1, 2, 3, 4]].apply(lambda x: percentage(x), axis=1)

    group = group.reset_index()
    group = group.rename(columns = {"index": "Question", 1: "SD = 1", 2: "D = 2", 3: "A = 3", 4: "SA = 4"})

    d[name_tg[0]][name_tg[1]] = [group, written_response_1, written_response_2, written_response_3]
```

<p>I created a directory in Colab, which will store all the summaries of each teacher.</p>

```bash
!mkdir "Individual Teacher Summary"
```

<p>Each CSV file will be named according to the teacher. However, we have to take into account that sometimes their names contain “/” such as “S/O”. This can mess up paths since “/” is used to identify directories. As such we want to replace “/” with something else.</p>

```python
escapedname = name.replace("/", "")
writer = pd.ExcelWriter(f"Individual Teacher Summary/{escapedname} summary.xlsx", engine="xlsxwriter")
```

<p>In the Excel file, I want the first sheet to contain the aggregated statistics of the teacher, and the rest of the sheets to contain the statistics of each teaching group that the teacher teaches. I created a dummy worksheet to act as the first worksheet, the reason is that xlsxwriter advises against reordering worksheets, and the data that is supposed to be in aggregate can only be obtained after I aggregated it from the other sheets.</p>

<p>Recall the dictionary created before is a dictionary in a dictionary, with the top-level dictionary containing the dictionaries for each teacher and the bottom-level dictionary containing the different teaching groups for that teacher.</p>

<p>The item of the bottom level dictionary is a list with 4 elements, the first being the dataframe containing the counts and means, the second being the dataframe with the first written responses, the third element is a dataframe containing the second written responses and the last element is a dataframe containing the third written responses.</p>

<p>As such I iterate through the dictionary, which in this case are the teacher names and create an Excel file for each of them. Then I iterate through the teaching groups of each teacher.</p>

<p>To add a dataframe to an Excel file in xlsx writer, one has to specify which is the starting row of the Excel in which the dataframe will be placed. I specified these rows in the start_rows list.</p>

<p>I want the written responses to be placed below the initial dataframe, as such using the length of the index with some extra offset, I specify where to place the first written response.</p>

```python
len(d[name][tg][0].index) + 2
```

<p>The second written response needs to be placed below the first written response, so I add the length of their indexes together with an offset.</p>

```css
len(d[name][tg][0].index) + len(d[name][tg][1].index) + 4,
```

<p>The third written response is also similarly placed underneath the second response.</p>

```python
len(d[name][tg][0].index) + len(d[name][tg][1].index) + len(d[name][tg][2].index) + 6
```

<p>I added the first dataframe to the sheet, I don&#39;t specify a start row for this dataframe since it&#39;s the first dataframe and I want it to be placed at the very top left.</p>

```python
d[name][tg][0].to_excel(writer, sheet_name=tg, index=False)
```

<p>I iterate through the start_rows list and add the remaining dataframes to the sheet based on the different starting rows. I added an additional column to the right of the written responses that counts the number of written responses as well.</p>

```python
for i, row in enumerate(start_rows):
      d[name][tg][i + 1].to_excel(writer, sheet_name=tg, startrow=row, index=False)
      pd.DataFrame({"Responses": [len(d[name][tg][1].index)]}).to_excel(writer, sheet_name=tg, startrow=row, startcol=1, index=False)
```

<p>Near the end of the iteration, I want to store the total responses and total open-ended responses so I can aggregate them for the first worksheet.</p>

<p>I used the autofit method to automatically fit the widths of the columns to the text as well.</p>

```python
total_response += d[name][tg][0].loc[0, "Responses"]
total_response_open += len(d[name][tg][1].index)

worksheet = writer.sheets[tg]
worksheet.autofit()
```

<p>Here is the full code, after all the teaching groups have been iterated through, the responses are aggregated, turned into a dataframe and placed in the first worksheet. This repeats for all teachers.</p>

```python
for name in d:
  escapedname = name.replace("/", "")
  writer = pd.ExcelWriter(f"Individual Teacher Summary/{escapedname} summary.xlsx", engine="xlsxwriter")

  dummy = pd.DataFrame()
  dummy.to_excel(writer, sheet_name="Aggregate")

  total_response = 0
  total_response_open = 0

  for tg in d[name]:

    start_rows = [
        len(d[name][tg][0].index) + 2,
        len(d[name][tg][0].index) + len(d[name][tg][1].index) + 4,
        len(d[name][tg][0].index) + len(d[name][tg][1].index) + len(d[name][tg][2].index) + 6,
    ]

    d[name][tg][0].to_excel(writer, sheet_name=tg, index=False)

    for i, row in enumerate(start_rows):
      d[name][tg][i + 1].to_excel(writer, sheet_name=tg, startrow=row, index=False)
      pd.DataFrame({"Responses": [len(d[name][tg][1].index)]}).to_excel(writer, sheet_name=tg, startrow=row, startcol=1, index=False)

    total_response += d[name][tg][0].loc[0, "Responses"]
    total_response_open += len(d[name][tg][1].index)

    worksheet = writer.sheets[tg]
    worksheet.autofit()

  agg = {
      "Teacher": [name],
      "Number of Teaching Groups": [len(d[name])],
      "Total responses across all TGs": [total_response],
      "Total responses across all TGs (open ended)": [total_response_open]
  }
  agg = pd.DataFrame(agg).transpose()
  agg.to_excel(writer, sheet_name="Aggregate", header=False)

  worksheet = writer.sheets["Aggregate"]
  worksheet.autofit()

  writer.close()
```

<p>The final step is to simply zip up the directory and it is ready to be downloaded!</p>

```bash
!zip -r "Individual Teacher Summary.zip" "Individual Teacher Summary"
```
