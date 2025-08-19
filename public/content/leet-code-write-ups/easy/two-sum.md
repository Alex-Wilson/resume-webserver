# Two Sum

Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.

Example 1:

Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].

Example 2:

Input: nums = [3,2,4], target = 6
Output: [1,2]

Example 3:

Input: nums = [3,3], target = 6
Output: [0,1]

# Naive Solution Psudeo Code
function(list, target)
    for i in range(len(list))
        for j in range(i+1, len(nums))
            if nums[i] + nums[j] = target
                return [i,j]

# Reasoning for Optimal Solution
The Naive assumption requires checking every element twice which is O(n^2). 

Instead of looking for both numbers at once store each index's value in a hashmap to be able to quickly look at it again if required. 
    init hash map

Loop through the list looking not not two values, but to see if a number and its complement are already in the hash map. .
    complement = target - list[index]

If our complement is found in the hashmap already, we can use it to quickly lookup the matching value from the key,value pair we pushed
        if compliment in hashmap
            return (hashmap[compliment], index)

If the complement is not found in the hashmap yet, we need to add the key value pair to the hashmap and keep searching in our for loop
        hashmap.add(list[item]:item)

# Optimal Solution Psuedo Code
function(list, target)
    init hashmap
    for item in list:
        compliment = target - list[item]

        //if the number is already found
        if compliment in hashmap
            return (hashmap[compliment], index)
        
        //base case, number is not in the hashmap, target not yet found
        //add in the key value pair as (value of list @ item, index)
        hashmap.add(list[item]:item)

# Optimal Python Solution

```python
class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        #create hashmap
        hash_map = {}

        #loop through the list
        for index in range(len(nums)):

            #look for the compliment of the target number
            compliment = target - nums[index]

            #check to see if the value is already in the hash map
            if compliment in hash_map:

                #if the value of the compliment is in the hashmap return its index and the current index
                return [hash_map[compliment], index]

            # if the compliment is not in the list, add it as KV:{nums[index],index} 
            hash_map[nums[index]] = index
```

# Optimal C++ Solution

```cpp
#include <vector>
#include <unordered_map>

class Solution {
public:
    // 1. Use 'const&' for non-mutated input
    std::vector<int> twoSum(const std::vector<int>& nums, int target) {
        std::unordered_map<int, int> hashmap;
        
        // 3. Use 'size_t' for the loop index
        for (size_t i = 0; i < nums.size(); ++i) {
            int complement = target - nums[i];
            
            // 2. Use find() for a single lookup
            auto it = hashmap.find(complement);
            if (it != hashmap.end()) {
                // it->first is the key (the number)
                // it->second is the value (the index)
                return {it->second, static_cast<int>(i)}; // LeetCode expects int return
            }
            
            map[nums[i]] = static_cast<int>(i);
        }
        
        return {}; // Return empty vector if no solution is found
    }
};
```