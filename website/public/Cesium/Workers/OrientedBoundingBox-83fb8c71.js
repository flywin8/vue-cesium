define([
  'exports',
  './Transforms-dadc538f',
  './Matrix2-163b5a1d',
  './Matrix3-b6f074fa',
  './defaultValue-0a909f67',
  './EllipsoidTangentPlane-f7077c2e',
  './Math-e97915da',
  './Plane-1c5a21a3'
], function (a, t, e, n, r, i, s, o) {
  'use strict'
  function c(a, t) {
    ;(this.center = n.Cartesian3.clone(r.defaultValue(a, n.Cartesian3.ZERO))), (this.halfAxes = n.Matrix3.clone(r.defaultValue(t, n.Matrix3.ZERO)))
  }
  ;(c.packedLength = n.Cartesian3.packedLength + n.Matrix3.packedLength),
    (c.pack = function (a, t, e) {
      return (e = r.defaultValue(e, 0)), n.Cartesian3.pack(a.center, t, e), n.Matrix3.pack(a.halfAxes, t, e + n.Cartesian3.packedLength), t
    }),
    (c.unpack = function (a, t, e) {
      return (
        (t = r.defaultValue(t, 0)),
        r.defined(e) || (e = new c()),
        n.Cartesian3.unpack(a, t, e.center),
        n.Matrix3.unpack(a, t + n.Cartesian3.packedLength, e.halfAxes),
        e
      )
    })
  const C = new n.Cartesian3(),
    u = new n.Cartesian3(),
    l = new n.Cartesian3(),
    d = new n.Cartesian3(),
    h = new n.Cartesian3(),
    x = new n.Cartesian3(),
    m = new n.Matrix3(),
    f = { unitary: new n.Matrix3(), diagonal: new n.Matrix3() }
  c.fromPoints = function (a, t) {
    if ((r.defined(t) || (t = new c()), !r.defined(a) || 0 === a.length)) return (t.halfAxes = n.Matrix3.ZERO), (t.center = n.Cartesian3.ZERO), t
    let e
    const i = a.length,
      s = n.Cartesian3.clone(a[0], C)
    for (e = 1; e < i; e++) n.Cartesian3.add(s, a[e], s)
    const o = 1 / i
    n.Cartesian3.multiplyByScalar(s, o, s)
    let M,
      p = 0,
      w = 0,
      g = 0,
      y = 0,
      b = 0,
      N = 0
    for (e = 0; e < i; e++)
      (M = n.Cartesian3.subtract(a[e], s, u)),
        (p += M.x * M.x),
        (w += M.x * M.y),
        (g += M.x * M.z),
        (y += M.y * M.y),
        (b += M.y * M.z),
        (N += M.z * M.z)
    ;(p *= o), (w *= o), (g *= o), (y *= o), (b *= o), (N *= o)
    const T = m
    ;(T[0] = p), (T[1] = w), (T[2] = g), (T[3] = w), (T[4] = y), (T[5] = b), (T[6] = g), (T[7] = b), (T[8] = N)
    const O = n.Matrix3.computeEigenDecomposition(T, f),
      A = n.Matrix3.clone(O.unitary, t.halfAxes)
    let P = n.Matrix3.getColumn(A, 0, d),
      I = n.Matrix3.getColumn(A, 1, h),
      R = n.Matrix3.getColumn(A, 2, x),
      E = -Number.MAX_VALUE,
      S = -Number.MAX_VALUE,
      U = -Number.MAX_VALUE,
      L = Number.MAX_VALUE,
      z = Number.MAX_VALUE,
      B = Number.MAX_VALUE
    for (e = 0; e < i; e++)
      (M = a[e]),
        (E = Math.max(n.Cartesian3.dot(P, M), E)),
        (S = Math.max(n.Cartesian3.dot(I, M), S)),
        (U = Math.max(n.Cartesian3.dot(R, M), U)),
        (L = Math.min(n.Cartesian3.dot(P, M), L)),
        (z = Math.min(n.Cartesian3.dot(I, M), z)),
        (B = Math.min(n.Cartesian3.dot(R, M), B))
    ;(P = n.Cartesian3.multiplyByScalar(P, 0.5 * (L + E), P)),
      (I = n.Cartesian3.multiplyByScalar(I, 0.5 * (z + S), I)),
      (R = n.Cartesian3.multiplyByScalar(R, 0.5 * (B + U), R))
    const V = n.Cartesian3.add(P, I, t.center)
    n.Cartesian3.add(V, R, V)
    const _ = l
    return (
      (_.x = E - L), (_.y = S - z), (_.z = U - B), n.Cartesian3.multiplyByScalar(_, 0.5, _), n.Matrix3.multiplyByScale(t.halfAxes, _, t.halfAxes), t
    )
  }
  const M = new n.Cartesian3(),
    p = new n.Cartesian3()
  function w(a, t, e, i, s, o, C, u, l, d, h) {
    r.defined(h) || (h = new c())
    const x = h.halfAxes
    n.Matrix3.setColumn(x, 0, t, x), n.Matrix3.setColumn(x, 1, e, x), n.Matrix3.setColumn(x, 2, i, x)
    let m = M
    ;(m.x = (s + o) / 2), (m.y = (C + u) / 2), (m.z = (l + d) / 2)
    const f = p
    ;(f.x = (o - s) / 2), (f.y = (u - C) / 2), (f.z = (d - l) / 2)
    const w = h.center
    return (m = n.Matrix3.multiplyByVector(x, m, m)), n.Cartesian3.add(a, m, w), n.Matrix3.multiplyByScale(x, f, x), h
  }
  const g = new n.Cartographic(),
    y = new n.Cartesian3(),
    b = new n.Cartographic(),
    N = new n.Cartographic(),
    T = new n.Cartographic(),
    O = new n.Cartographic(),
    A = new n.Cartographic(),
    P = new n.Cartesian3(),
    I = new n.Cartesian3(),
    R = new n.Cartesian3(),
    E = new n.Cartesian3(),
    S = new n.Cartesian3(),
    U = new e.Cartesian2(),
    L = new e.Cartesian2(),
    z = new e.Cartesian2(),
    B = new e.Cartesian2(),
    V = new e.Cartesian2(),
    _ = new n.Cartesian3(),
    k = new n.Cartesian3(),
    W = new n.Cartesian3(),
    X = new n.Cartesian3(),
    q = new e.Cartesian2(),
    D = new n.Cartesian3(),
    j = new n.Cartesian3(),
    Z = new n.Cartesian3(),
    v = new o.Plane(n.Cartesian3.UNIT_X, 0)
  ;(c.fromRectangle = function (a, t, c, C, u) {
    let l, d, h, x, m, f, M
    if (((t = r.defaultValue(t, 0)), (c = r.defaultValue(c, 0)), (C = r.defaultValue(C, n.Ellipsoid.WGS84)), a.width <= s.CesiumMath.PI)) {
      const r = e.Rectangle.center(a, g),
        s = C.cartographicToCartesian(r, y),
        p = new i.EllipsoidTangentPlane(s, C)
      M = p.plane
      const _ = r.longitude,
        k = a.south < 0 && a.north > 0 ? 0 : r.latitude,
        W = n.Cartographic.fromRadians(_, a.north, c, b),
        X = n.Cartographic.fromRadians(a.west, a.north, c, N),
        q = n.Cartographic.fromRadians(a.west, k, c, T),
        D = n.Cartographic.fromRadians(a.west, a.south, c, O),
        j = n.Cartographic.fromRadians(_, a.south, c, A),
        Z = C.cartographicToCartesian(W, P)
      let v = C.cartographicToCartesian(X, I)
      const Y = C.cartographicToCartesian(q, R)
      let G = C.cartographicToCartesian(D, E)
      const F = C.cartographicToCartesian(j, S),
        H = p.projectPointToNearestOnPlane(Z, U),
        J = p.projectPointToNearestOnPlane(v, L),
        K = p.projectPointToNearestOnPlane(Y, z),
        Q = p.projectPointToNearestOnPlane(G, B),
        $ = p.projectPointToNearestOnPlane(F, V)
      return (
        (l = Math.min(J.x, K.x, Q.x)),
        (d = -l),
        (x = Math.max(J.y, H.y)),
        (h = Math.min(Q.y, $.y)),
        (X.height = D.height = t),
        (v = C.cartographicToCartesian(X, I)),
        (G = C.cartographicToCartesian(D, E)),
        (m = Math.min(o.Plane.getPointDistance(M, v), o.Plane.getPointDistance(M, G))),
        (f = c),
        w(p.origin, p.xAxis, p.yAxis, p.zAxis, l, d, h, x, m, f, u)
      )
    }
    const p = a.south > 0,
      Y = a.north < 0,
      G = p ? a.south : Y ? a.north : 0,
      F = e.Rectangle.center(a, g).longitude,
      H = n.Cartesian3.fromRadians(F, G, c, C, _)
    H.z = 0
    const J = Math.abs(H.x) < s.CesiumMath.EPSILON10 && Math.abs(H.y) < s.CesiumMath.EPSILON10 ? n.Cartesian3.UNIT_X : n.Cartesian3.normalize(H, k),
      K = n.Cartesian3.UNIT_Z,
      Q = n.Cartesian3.cross(J, K, W)
    M = o.Plane.fromPointNormal(H, J, v)
    const $ = n.Cartesian3.fromRadians(F + s.CesiumMath.PI_OVER_TWO, G, c, C, X)
    ;(d = n.Cartesian3.dot(o.Plane.projectPointOntoPlane(M, $, q), Q)),
      (l = -d),
      (x = n.Cartesian3.fromRadians(0, a.north, Y ? t : c, C, D).z),
      (h = n.Cartesian3.fromRadians(0, a.south, p ? t : c, C, j).z)
    const aa = n.Cartesian3.fromRadians(a.east, G, c, C, Z)
    return (m = o.Plane.getPointDistance(M, aa)), (f = 0), w(H, Q, K, J, l, d, h, x, m, f, u)
  }),
    (c.fromTransformation = function (a, t) {
      return (
        r.defined(t) || (t = new c()),
        (t.center = e.Matrix4.getTranslation(a, t.center)),
        (t.halfAxes = e.Matrix4.getMatrix3(a, t.halfAxes)),
        (t.halfAxes = n.Matrix3.multiplyByScalar(t.halfAxes, 0.5, t.halfAxes)),
        t
      )
    }),
    (c.clone = function (a, t) {
      if (r.defined(a))
        return r.defined(t) ? (n.Cartesian3.clone(a.center, t.center), n.Matrix3.clone(a.halfAxes, t.halfAxes), t) : new c(a.center, a.halfAxes)
    }),
    (c.intersectPlane = function (a, e) {
      const r = a.center,
        i = e.normal,
        s = a.halfAxes,
        o = i.x,
        c = i.y,
        C = i.z,
        u =
          Math.abs(o * s[n.Matrix3.COLUMN0ROW0] + c * s[n.Matrix3.COLUMN0ROW1] + C * s[n.Matrix3.COLUMN0ROW2]) +
          Math.abs(o * s[n.Matrix3.COLUMN1ROW0] + c * s[n.Matrix3.COLUMN1ROW1] + C * s[n.Matrix3.COLUMN1ROW2]) +
          Math.abs(o * s[n.Matrix3.COLUMN2ROW0] + c * s[n.Matrix3.COLUMN2ROW1] + C * s[n.Matrix3.COLUMN2ROW2]),
        l = n.Cartesian3.dot(i, r) + e.distance
      return l <= -u ? t.Intersect.OUTSIDE : l >= u ? t.Intersect.INSIDE : t.Intersect.INTERSECTING
    })
  const Y = new n.Cartesian3(),
    G = new n.Cartesian3(),
    F = new n.Cartesian3(),
    H = new n.Cartesian3(),
    J = new n.Cartesian3(),
    K = new n.Cartesian3()
  c.distanceSquaredTo = function (a, t) {
    const e = n.Cartesian3.subtract(t, a.center, M),
      r = a.halfAxes
    let i = n.Matrix3.getColumn(r, 0, Y),
      o = n.Matrix3.getColumn(r, 1, G),
      c = n.Matrix3.getColumn(r, 2, F)
    const C = n.Cartesian3.magnitude(i),
      u = n.Cartesian3.magnitude(o),
      l = n.Cartesian3.magnitude(c)
    let d = !0,
      h = !0,
      x = !0
    C > 0 ? n.Cartesian3.divideByScalar(i, C, i) : (d = !1),
      u > 0 ? n.Cartesian3.divideByScalar(o, u, o) : (h = !1),
      l > 0 ? n.Cartesian3.divideByScalar(c, l, c) : (x = !1)
    const m = !d + !h + !x
    let f, p, w
    if (1 === m) {
      let a = i
      ;(f = o),
        (p = c),
        h ? x || ((a = c), (p = i)) : ((a = o), (f = i)),
        (w = n.Cartesian3.cross(f, p, J)),
        a === i ? (i = w) : a === o ? (o = w) : a === c && (c = w)
    } else if (2 === m) {
      ;(f = i), h ? (f = o) : x && (f = c)
      let a = n.Cartesian3.UNIT_Y
      a.equalsEpsilon(f, s.CesiumMath.EPSILON3) && (a = n.Cartesian3.UNIT_X),
        (p = n.Cartesian3.cross(f, a, H)),
        n.Cartesian3.normalize(p, p),
        (w = n.Cartesian3.cross(f, p, J)),
        n.Cartesian3.normalize(w, w),
        f === i ? ((o = p), (c = w)) : f === o ? ((c = p), (i = w)) : f === c && ((i = p), (o = w))
    } else 3 === m && ((i = n.Cartesian3.UNIT_X), (o = n.Cartesian3.UNIT_Y), (c = n.Cartesian3.UNIT_Z))
    const g = K
    ;(g.x = n.Cartesian3.dot(e, i)), (g.y = n.Cartesian3.dot(e, o)), (g.z = n.Cartesian3.dot(e, c))
    let y,
      b = 0
    return (
      g.x < -C ? ((y = g.x + C), (b += y * y)) : g.x > C && ((y = g.x - C), (b += y * y)),
      g.y < -u ? ((y = g.y + u), (b += y * y)) : g.y > u && ((y = g.y - u), (b += y * y)),
      g.z < -l ? ((y = g.z + l), (b += y * y)) : g.z > l && ((y = g.z - l), (b += y * y)),
      b
    )
  }
  const Q = new n.Cartesian3(),
    $ = new n.Cartesian3()
  c.computePlaneDistances = function (a, e, i, s) {
    r.defined(s) || (s = new t.Interval())
    let o = Number.POSITIVE_INFINITY,
      c = Number.NEGATIVE_INFINITY
    const C = a.center,
      u = a.halfAxes,
      l = n.Matrix3.getColumn(u, 0, Y),
      d = n.Matrix3.getColumn(u, 1, G),
      h = n.Matrix3.getColumn(u, 2, F),
      x = n.Cartesian3.add(l, d, Q)
    n.Cartesian3.add(x, h, x), n.Cartesian3.add(x, C, x)
    const m = n.Cartesian3.subtract(x, e, $)
    let f = n.Cartesian3.dot(i, m)
    return (
      (o = Math.min(f, o)),
      (c = Math.max(f, c)),
      n.Cartesian3.add(C, l, x),
      n.Cartesian3.add(x, d, x),
      n.Cartesian3.subtract(x, h, x),
      n.Cartesian3.subtract(x, e, m),
      (f = n.Cartesian3.dot(i, m)),
      (o = Math.min(f, o)),
      (c = Math.max(f, c)),
      n.Cartesian3.add(C, l, x),
      n.Cartesian3.subtract(x, d, x),
      n.Cartesian3.add(x, h, x),
      n.Cartesian3.subtract(x, e, m),
      (f = n.Cartesian3.dot(i, m)),
      (o = Math.min(f, o)),
      (c = Math.max(f, c)),
      n.Cartesian3.add(C, l, x),
      n.Cartesian3.subtract(x, d, x),
      n.Cartesian3.subtract(x, h, x),
      n.Cartesian3.subtract(x, e, m),
      (f = n.Cartesian3.dot(i, m)),
      (o = Math.min(f, o)),
      (c = Math.max(f, c)),
      n.Cartesian3.subtract(C, l, x),
      n.Cartesian3.add(x, d, x),
      n.Cartesian3.add(x, h, x),
      n.Cartesian3.subtract(x, e, m),
      (f = n.Cartesian3.dot(i, m)),
      (o = Math.min(f, o)),
      (c = Math.max(f, c)),
      n.Cartesian3.subtract(C, l, x),
      n.Cartesian3.add(x, d, x),
      n.Cartesian3.subtract(x, h, x),
      n.Cartesian3.subtract(x, e, m),
      (f = n.Cartesian3.dot(i, m)),
      (o = Math.min(f, o)),
      (c = Math.max(f, c)),
      n.Cartesian3.subtract(C, l, x),
      n.Cartesian3.subtract(x, d, x),
      n.Cartesian3.add(x, h, x),
      n.Cartesian3.subtract(x, e, m),
      (f = n.Cartesian3.dot(i, m)),
      (o = Math.min(f, o)),
      (c = Math.max(f, c)),
      n.Cartesian3.subtract(C, l, x),
      n.Cartesian3.subtract(x, d, x),
      n.Cartesian3.subtract(x, h, x),
      n.Cartesian3.subtract(x, e, m),
      (f = n.Cartesian3.dot(i, m)),
      (o = Math.min(f, o)),
      (c = Math.max(f, c)),
      (s.start = o),
      (s.stop = c),
      s
    )
  }
  const aa = new n.Cartesian3(),
    ta = new n.Cartesian3(),
    ea = new n.Cartesian3()
  c.computeCorners = function (a, t) {
    r.defined(t) ||
      (t = [
        new n.Cartesian3(),
        new n.Cartesian3(),
        new n.Cartesian3(),
        new n.Cartesian3(),
        new n.Cartesian3(),
        new n.Cartesian3(),
        new n.Cartesian3(),
        new n.Cartesian3()
      ])
    const e = a.center,
      i = a.halfAxes,
      s = n.Matrix3.getColumn(i, 0, aa),
      o = n.Matrix3.getColumn(i, 1, ta),
      c = n.Matrix3.getColumn(i, 2, ea)
    return (
      n.Cartesian3.clone(e, t[0]),
      n.Cartesian3.subtract(t[0], s, t[0]),
      n.Cartesian3.subtract(t[0], o, t[0]),
      n.Cartesian3.subtract(t[0], c, t[0]),
      n.Cartesian3.clone(e, t[1]),
      n.Cartesian3.subtract(t[1], s, t[1]),
      n.Cartesian3.subtract(t[1], o, t[1]),
      n.Cartesian3.add(t[1], c, t[1]),
      n.Cartesian3.clone(e, t[2]),
      n.Cartesian3.subtract(t[2], s, t[2]),
      n.Cartesian3.add(t[2], o, t[2]),
      n.Cartesian3.subtract(t[2], c, t[2]),
      n.Cartesian3.clone(e, t[3]),
      n.Cartesian3.subtract(t[3], s, t[3]),
      n.Cartesian3.add(t[3], o, t[3]),
      n.Cartesian3.add(t[3], c, t[3]),
      n.Cartesian3.clone(e, t[4]),
      n.Cartesian3.add(t[4], s, t[4]),
      n.Cartesian3.subtract(t[4], o, t[4]),
      n.Cartesian3.subtract(t[4], c, t[4]),
      n.Cartesian3.clone(e, t[5]),
      n.Cartesian3.add(t[5], s, t[5]),
      n.Cartesian3.subtract(t[5], o, t[5]),
      n.Cartesian3.add(t[5], c, t[5]),
      n.Cartesian3.clone(e, t[6]),
      n.Cartesian3.add(t[6], s, t[6]),
      n.Cartesian3.add(t[6], o, t[6]),
      n.Cartesian3.subtract(t[6], c, t[6]),
      n.Cartesian3.clone(e, t[7]),
      n.Cartesian3.add(t[7], s, t[7]),
      n.Cartesian3.add(t[7], o, t[7]),
      n.Cartesian3.add(t[7], c, t[7]),
      t
    )
  }
  const na = new n.Matrix3()
  c.computeTransformation = function (a, t) {
    r.defined(t) || (t = new e.Matrix4())
    const i = a.center,
      s = n.Matrix3.multiplyByUniformScale(a.halfAxes, 2, na)
    return e.Matrix4.fromRotationTranslation(s, i, t)
  }
  const ra = new t.BoundingSphere()
  ;(c.isOccluded = function (a, e) {
    const n = t.BoundingSphere.fromOrientedBoundingBox(a, ra)
    return !e.isBoundingSphereVisible(n)
  }),
    (c.prototype.intersectPlane = function (a) {
      return c.intersectPlane(this, a)
    }),
    (c.prototype.distanceSquaredTo = function (a) {
      return c.distanceSquaredTo(this, a)
    }),
    (c.prototype.computePlaneDistances = function (a, t, e) {
      return c.computePlaneDistances(this, a, t, e)
    }),
    (c.prototype.computeCorners = function (a) {
      return c.computeCorners(this, a)
    }),
    (c.prototype.computeTransformation = function (a) {
      return c.computeTransformation(this, a)
    }),
    (c.prototype.isOccluded = function (a) {
      return c.isOccluded(this, a)
    }),
    (c.equals = function (a, t) {
      return a === t || (r.defined(a) && r.defined(t) && n.Cartesian3.equals(a.center, t.center) && n.Matrix3.equals(a.halfAxes, t.halfAxes))
    }),
    (c.prototype.clone = function (a) {
      return c.clone(this, a)
    }),
    (c.prototype.equals = function (a) {
      return c.equals(this, a)
    }),
    (a.OrientedBoundingBox = c)
})