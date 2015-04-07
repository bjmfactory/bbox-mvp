m.deferred.resolve = function (value) {
  var deferred = m.deferred()
  deferred.resolve(value)
  return deferred.promise
}

m.deferred.reject = function (value) {
  var deferred = m.deferred()
  deferred.reject(value)
  return deferred.promise
}
