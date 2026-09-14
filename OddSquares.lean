import Std

/-- Sum of the first n odd natural numbers, including the empty sum. -/
def oddSum : Nat → Nat
  | 0 => 0
  | n + 1 => oddSum n + (2 * n + 1)

/-- Each next L-shaped border turns an n-square into an (n+1)-square. -/
theorem oddSum_eq_square (n : Nat) : oddSum n = n ^ 2 := by
  induction n with
  | zero => rfl
  | succ n ih =>
    simp only [oddSum, ih, Nat.pow_two, Nat.mul_add, Nat.add_mul,
      Nat.mul_one, Nat.one_mul]
    omega

#print axioms oddSum_eq_square
#eval [0, 1, 3, 5, 8, 12].map fun n => (n, oddSum n)
