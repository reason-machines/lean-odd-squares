import Std

/-- The first n odd numbers, with the empty sum equal to zero. -/
def oddSum : Nat → Nat
  | 0 => 0
  | n + 1 => oddSum n + (2 * n + 1)

/-- Adding an L-shaped border turns an n-square into an (n+1)-square. -/
theorem oddSum_eq_square (n : Nat) : oddSum n = n ^ 2 := by
  induction n with
  | zero => rfl
  | succ n ih =>
    simp only [oddSum, ih, Nat.pow_succ, Nat.pow_zero, Nat.mul_one]
    simp [Nat.mul_add, Nat.add_mul, Nat.succ_mul, Nat.add_assoc, Nat.add_comm, Nat.add_left_comm]

#print axioms oddSum_eq_square
