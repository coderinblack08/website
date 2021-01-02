---
tag: 'USACO'
date: '12/30/2020'
title: 'Broken Necklace, String Manipulation (USACO Training)'
description: 'Contains a problem from section 1.2 of the USACO training site'
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

## Broken Necklace

You have a necklace of $N$ red, white, or blue beads ($3 \leq N \leq 350$) some of which are red, others blue, and others white, arranged at random. Here are two examples for $N = 29$:

```
                1 2                               1 2
            r b b r                           b r r b
          r         b                       b         b
         r           r                     b           r
        r             r                   w             r
       b               r                 w               w
      b                 b               r                 r
      b                 b               b                 b
      b                 b               r                 b
       r               r                 b               r
        b             r                   r             r
         b           r                     r           r
           r       r                         r       b
             r b r                             r r w
            Figure A                         Figure B
                        r red bead
                        b blue bead
                        w white bead
```

The beads considered first and second in the text that follows have been marked in the picture.

The configuration in Figure A may be represented as a string of $b$'s and $r$'s, where $b$ represents a blue bead and $r$ represents a red one, as follows: $brbrrrbbbrrrrrbrrbbrbbbbrrrrb$.

Suppose you are to break the necklace at some point, lay it out straight, and then collect beads of the same color from one end until you reach a bead of a different color, and do the same for the other end (which might not be of the same color as the beads collected before this).

Determine the point where the necklace should be broken so that the most number of beads can be collected. No bead can be collected more than once.

### Sample Input (file beads.in)

```
29
wwwbbrwrbrbrrbrbrwrwwrbwrwrrb
```

### Sample Output (file beads.out)

```
11
```

### Output Explanation

Consider two copies of the beads (kind of like being able to runaround the ends). The string of 11 is marked.

```
                Two necklace copies joined here
                             v
wwwbbrwrbrbrrbrbrwrwwrbwrwrrb|wwwbbrwrbrbrrbrbrwrwwrbwrwrrb
                       ******|*****
                       rrrrrb|bbbbb  <-- assignments
                   5xr .....#|#####  6xb
                        5+6 = 11 total
```

## Solution

Just like we did in the explanation, we can cycle through the string. This means
we put the last character in the front. For example, if we started with 'abc', we would have the cycle:
'abc', 'cab', and 'bca' (note this is similar to moving the 'v' cursor in above).

Given a bracelet, we can preform a similar task as above. For example, let's try to simulate what would happen if 'rrwb' was the necklace.
We would first try all the possible cycles ('rrwb', 'brrw', 'wbrr', 'rwbr'). For each string, we can count the number of 'r' or 'b' beads from left or right.

So if we had 'rrwb', we collect either $2$ blue beads from the left or $0$ red from the right. We can collect $3$ red and $0$ blue from the left.
This means we can get at most $max(2, 0) + max(3, 0) = 5$.

Now we can do this for all other strings in the cycle. We can take the max amount of beads collected and print it as our answer!

```cpp:beads.cpp
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

int n;
string s;

int collect(char bead, bool left) {
  int len = 0;
  if (left) {
    for (ll i = n - 1; i >= 0; i--) {
      if (s[i] == bead || s[i] == 'w') {
        len++;
      } else {
        break;
      }
    }
  } else {
    for (ll i = 0; i < n; i++) {
      if (s[i] == bead || s[i] == 'w') {
        len++;
      } else {
        break;
      }
    }
  }
  return len;
}

int main() {
  setIO("beads");
  cin >> n >> s;
  string og = s;
  int ans = 0;
  do {
    int l = 0, r = 0;
    const char beads[2] = {'r', 'b'};
    for (char i : beads) {
      l = max(l, collect(i, true));
      r = max(r, collect(i, false));
      cerr << l << " " << r << " " << i << endl;
    }
    if (l + r > n) {
      ans = n;
    } else {
      ans = max(ans, l + r);
    }
    cerr << l << " " << r << " " << s << endl;
    s = s[n - 1] + s.substr(0, n - 1);
  } while (og != s);
  cout << ans << endl;
  return 0;
}
```
