---
tag: 'USACO'
date: '1/1/2021'
title: 'Milking Cows, Intervals with Prefix Sums (USACO Training)'
description: 'Contains a problem from section 1.3 of the USACO training site'
---

<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/katex@0.11.0/dist/katex.min.css"
  integrity="sha384-BdGj8xC2eZkQaxoQ8nSLefg4AV4/AwB3Fj+8SUSo7pnKP6Eoy18liIKTPn9oBYNG"
  crossOrigin="anonymous"
/>

This is part of a "series" of problem explanations from USACO Training.

1. Broken Necklace (beads)
2. Milking Cows (milk2)
3. Transformations (transform)

## Milking Cows

Three farmers rise at 5 am each morning and head for the barn to milk three cows. The first farmer begins milking his cow at time 300 (measured in seconds after 5 am) and ends at time 1000. The second farmer begins at time 700 and ends at time 1200. The third farmer begins at time 1500 and ends at time 2100. The longest continuous time during which at least one farmer was milking a cow was 900 seconds (from 300 to 1200). The longest time no milking was done, between the beginning and the ending of all milking, was 300 seconds (1500 minus 1200).

Your job is to write a program that will examine a list of beginning and ending times for $N$ ($1 \leq N \leq 5000$) farmers milking $N$ cows and compute (in seconds):

1. The longest time interval at least one cow was milked.

2. The longest time interval (after milking starts) during which no cows were being milked.

> **NOTE**: Milking from time 1 through 10, then from time 11 through 20 counts as two different time intervals.

### Sample Input (file milk2.in)

```
3
300 1000
700 1200
1500 2100
```

### Sample Output (file milk2.out)

```
900 300
```

### Output Explanation

The longest continuous milking period is from $300 - 1200$ and the longest period where a cow was not milked is $1200 - 1500$.

## Solution

My solution code is a bit messy so I'll try to go through it. First, we get a starting and ending interval.
We store the time and $\{1, -1\}$, corresponding to if it is a starting or ending point.

We can then go through the points on the "timeline" and add the second number ($1$ or $-1$) to an accumulator (`cur` in the code below).
If the total sum is 0, then we have no farmer milking a cow.

We can have `cont` and `idle` as two variables, both initialized to $-1$. Once we hit `cur == 0 && idle == -1`, then we can set `idle` to be the current time.
Once we hit a number in which `cur != 0`, then we can set the maximum idle time to be the `max(current answer, current time - idle)` if idle isn't $-1$. We can then set `idle = 1`.

Finding the longest continuos milking time is a bit more tricky. Remember, is we have intervals $[50, 100]$ and $[100, 200]$, the longest continuos milking session is $250$ long since 
intervals can start and end at the same time!

Like we did for the longest idle time, we can set `cont` to be our current time if `cur != 0 && cont == -1`. 
If `cur == 0 && cont != -1`, then we can set the maximum continuous time to be `max(current answer, current time - cont)`.
We also have to check if the next point in time occurs at the same time this one happens. If not, then we can set `cont = -1`.

This is quick enough since it runs in $\mathcal{O}(2n)$ time.

```cpp
#include <bits/stdc++.h>
#define all(x) (x).begin(), (x).end()
#define ll long long
using namespace std;

void setIO(string s = "") {
  ios_base::sync_with_stdio(0);
  cin.tie(0);
  if ((int)s.size()) {
    freopen((s + ".in").c_str(), "r", stdin);
    freopen((s + ".out").c_str(), "w", stdout);
  }
}

int main() {
  setIO("milk2");
  int n;
  cin >> n;
  vector<pair<int, int>> v;
  for (int i = 0; i < n; i++) {
    int a, b;
    cin >> a >> b;
    v.push_back({a, 1});
    v.push_back({b, -1});
  }
  sort(all(v));
  int cur = 0, idle = -1, cont = -1;
  pair<int, int> ans = {0, 0};
  for (int i = 0; i < 2 * n; i++) {
    pair<int, int> a = v[i];
    cur += a.second;
    if (cur == 0) {
      if (idle == -1) {
        idle = a.first;
      }
      if (cont != -1) {
        ans.first = max(ans.first, a.first - cont);
        if (i != 2 * n - 1 && v[i + 1].first == a.first) {
          cont = cont;
        } else {
          cont = -1;
        }
      }
    } else {
      if (idle != -1) {
        ans.second = max(ans.second, a.first - idle);
        idle = -1;
      }
      if (cont == -1) {
        cont = a.first;
      }
    }
  }
  cout << ans.first << " " << ans.second << endl;
  return 0;
}
```
