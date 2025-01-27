define([
  'exports',
  './Transforms-dadc538f',
  './Matrix3-b6f074fa',
  './ComponentDatatype-77274976',
  './defaultValue-0a909f67',
  './GeometryAttribute-e2b38d72',
  './GeometryAttributes-f06a2792',
  './GeometryOffsetAttribute-04332ce7',
  './IndexDatatype-2149f06c',
  './Math-e97915da'
], function (t, i, e, a, n, o, r, s, u, m) {
  'use strict'
  const f = new e.Cartesian3(1, 1, 1),
    l = Math.cos,
    c = Math.sin
  function d(t) {
    t = n.defaultValue(t, n.defaultValue.EMPTY_OBJECT)
    const i = n.defaultValue(t.radii, f),
      a = n.defaultValue(t.innerRadii, i),
      o = n.defaultValue(t.minimumClock, 0),
      r = n.defaultValue(t.maximumClock, m.CesiumMath.TWO_PI),
      s = n.defaultValue(t.minimumCone, 0),
      u = n.defaultValue(t.maximumCone, m.CesiumMath.PI),
      l = Math.round(n.defaultValue(t.stackPartitions, 10)),
      c = Math.round(n.defaultValue(t.slicePartitions, 8)),
      d = Math.round(n.defaultValue(t.subdivisions, 128))
    ;(this._radii = e.Cartesian3.clone(i)),
      (this._innerRadii = e.Cartesian3.clone(a)),
      (this._minimumClock = o),
      (this._maximumClock = r),
      (this._minimumCone = s),
      (this._maximumCone = u),
      (this._stackPartitions = l),
      (this._slicePartitions = c),
      (this._subdivisions = d),
      (this._offsetAttribute = t.offsetAttribute),
      (this._workerName = 'createEllipsoidOutlineGeometry')
  }
  ;(d.packedLength = 2 * e.Cartesian3.packedLength + 8),
    (d.pack = function (t, i, a) {
      return (
        (a = n.defaultValue(a, 0)),
        e.Cartesian3.pack(t._radii, i, a),
        (a += e.Cartesian3.packedLength),
        e.Cartesian3.pack(t._innerRadii, i, a),
        (a += e.Cartesian3.packedLength),
        (i[a++] = t._minimumClock),
        (i[a++] = t._maximumClock),
        (i[a++] = t._minimumCone),
        (i[a++] = t._maximumCone),
        (i[a++] = t._stackPartitions),
        (i[a++] = t._slicePartitions),
        (i[a++] = t._subdivisions),
        (i[a] = n.defaultValue(t._offsetAttribute, -1)),
        i
      )
    })
  const C = new e.Cartesian3(),
    _ = new e.Cartesian3(),
    p = {
      radii: C,
      innerRadii: _,
      minimumClock: void 0,
      maximumClock: void 0,
      minimumCone: void 0,
      maximumCone: void 0,
      stackPartitions: void 0,
      slicePartitions: void 0,
      subdivisions: void 0,
      offsetAttribute: void 0
    }
  ;(d.unpack = function (t, i, a) {
    i = n.defaultValue(i, 0)
    const o = e.Cartesian3.unpack(t, i, C)
    i += e.Cartesian3.packedLength
    const r = e.Cartesian3.unpack(t, i, _)
    i += e.Cartesian3.packedLength
    const s = t[i++],
      u = t[i++],
      m = t[i++],
      f = t[i++],
      l = t[i++],
      c = t[i++],
      h = t[i++],
      y = t[i]
    return n.defined(a)
      ? ((a._radii = e.Cartesian3.clone(o, a._radii)),
        (a._innerRadii = e.Cartesian3.clone(r, a._innerRadii)),
        (a._minimumClock = s),
        (a._maximumClock = u),
        (a._minimumCone = m),
        (a._maximumCone = f),
        (a._stackPartitions = l),
        (a._slicePartitions = c),
        (a._subdivisions = h),
        (a._offsetAttribute = -1 === y ? void 0 : y),
        a)
      : ((p.minimumClock = s),
        (p.maximumClock = u),
        (p.minimumCone = m),
        (p.maximumCone = f),
        (p.stackPartitions = l),
        (p.slicePartitions = c),
        (p.subdivisions = h),
        (p.offsetAttribute = -1 === y ? void 0 : y),
        new d(p))
  }),
    (d.createGeometry = function (t) {
      const f = t._radii
      if (f.x <= 0 || f.y <= 0 || f.z <= 0) return
      const d = t._innerRadii
      if (d.x <= 0 || d.y <= 0 || d.z <= 0) return
      const C = t._minimumClock,
        _ = t._maximumClock,
        p = t._minimumCone,
        h = t._maximumCone,
        y = t._subdivisions,
        k = e.Ellipsoid.fromCartesian3(f)
      let b = t._slicePartitions + 1,
        x = t._stackPartitions + 1
      ;(b = Math.round((b * Math.abs(_ - C)) / m.CesiumMath.TWO_PI)),
        (x = Math.round((x * Math.abs(h - p)) / m.CesiumMath.PI)),
        b < 2 && (b = 2),
        x < 2 && (x = 2)
      let A = 0,
        P = 1
      const v = d.x !== f.x || d.y !== f.y || d.z !== f.z
      let M = !1,
        w = !1
      v && ((P = 2), p > 0 && ((M = !0), (A += b)), h < Math.PI && ((w = !0), (A += b)))
      const V = y * P * (x + b),
        g = new Float64Array(3 * V),
        G = 2 * (V + A - (b + x) * P),
        E = u.IndexDatatype.createTypedArray(V, G)
      let O,
        D,
        I,
        T,
        z = 0
      const L = new Array(x),
        R = new Array(x)
      for (O = 0; O < x; O++) (T = p + (O * (h - p)) / (x - 1)), (L[O] = c(T)), (R[O] = l(T))
      const N = new Array(y),
        B = new Array(y)
      for (O = 0; O < y; O++) (I = C + (O * (_ - C)) / (y - 1)), (N[O] = c(I)), (B[O] = l(I))
      for (O = 0; O < x; O++) for (D = 0; D < y; D++) (g[z++] = f.x * L[O] * B[D]), (g[z++] = f.y * L[O] * N[D]), (g[z++] = f.z * R[O])
      if (v) for (O = 0; O < x; O++) for (D = 0; D < y; D++) (g[z++] = d.x * L[O] * B[D]), (g[z++] = d.y * L[O] * N[D]), (g[z++] = d.z * R[O])
      for (L.length = y, R.length = y, O = 0; O < y; O++) (T = p + (O * (h - p)) / (y - 1)), (L[O] = c(T)), (R[O] = l(T))
      for (N.length = b, B.length = b, O = 0; O < b; O++) (I = C + (O * (_ - C)) / (b - 1)), (N[O] = c(I)), (B[O] = l(I))
      for (O = 0; O < y; O++) for (D = 0; D < b; D++) (g[z++] = f.x * L[O] * B[D]), (g[z++] = f.y * L[O] * N[D]), (g[z++] = f.z * R[O])
      if (v) for (O = 0; O < y; O++) for (D = 0; D < b; D++) (g[z++] = d.x * L[O] * B[D]), (g[z++] = d.y * L[O] * N[D]), (g[z++] = d.z * R[O])
      for (z = 0, O = 0; O < x * P; O++) {
        const t = O * y
        for (D = 0; D < y - 1; D++) (E[z++] = t + D), (E[z++] = t + D + 1)
      }
      let S = x * y * P
      for (O = 0; O < b; O++) for (D = 0; D < y - 1; D++) (E[z++] = S + O + D * b), (E[z++] = S + O + (D + 1) * b)
      if (v) for (S = x * y * P + b * y, O = 0; O < b; O++) for (D = 0; D < y - 1; D++) (E[z++] = S + O + D * b), (E[z++] = S + O + (D + 1) * b)
      if (v) {
        let t = x * y * P,
          i = t + y * b
        if (M) for (O = 0; O < b; O++) (E[z++] = t + O), (E[z++] = i + O)
        if (w) for (t += y * b - b, i += y * b - b, O = 0; O < b; O++) (E[z++] = t + O), (E[z++] = i + O)
      }
      const U = new r.GeometryAttributes({
        position: new o.GeometryAttribute({ componentDatatype: a.ComponentDatatype.DOUBLE, componentsPerAttribute: 3, values: g })
      })
      if (n.defined(t._offsetAttribute)) {
        const i = g.length,
          e = t._offsetAttribute === s.GeometryOffsetAttribute.NONE ? 0 : 1,
          n = new Uint8Array(i / 3).fill(e)
        U.applyOffset = new o.GeometryAttribute({ componentDatatype: a.ComponentDatatype.UNSIGNED_BYTE, componentsPerAttribute: 1, values: n })
      }
      return new o.Geometry({
        attributes: U,
        indices: E,
        primitiveType: o.PrimitiveType.LINES,
        boundingSphere: i.BoundingSphere.fromEllipsoid(k),
        offsetAttribute: t._offsetAttribute
      })
    }),
    (t.EllipsoidOutlineGeometry = d)
})
