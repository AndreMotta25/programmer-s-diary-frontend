export function sort<T, K extends keyof T>(arr:T[], key: K):T[] {
    return arr.sort((a,b) => {
          if(a[key] > b[key] ) return 1;
          if(a[key] < b[key] ) return -1;
          return 0 
    })
  }