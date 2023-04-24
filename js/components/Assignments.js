import AssignmentList from "./AssignmentList.js";
import AssignmentCreate from "./AssignmentCreate.js";

export default {
    components: { AssignmentList, AssignmentCreate },
    template: `
    <section class="space-y-6">
        <assignment-list :assignments="filters.inProgress" title="In Progress"></assignment-list>
        <assignment-list :assignments="filters.completed" title="Completed"></assignment-list>
        <assignmentCreate @add='add'></assignmentCreate>
    </section>
    `,
    data() {
        return {
            assignments: [
                { name: "Test 1", completed: false, id: 1 },
                { name: "Test 2", completed: false, id: 2},
                { name: "Test 3", completed: false, id: 3} 
            ]
        };
    },
    computed: {
        filters() {
            return {
                inProgress: this.assignments.filter( assignment => ! assignment.completed ),
                completed: this.assignments.filter( assignment => assignment.completed )

            }
        }
    },
    methods: {
        add(name) {
            this.assignments.push({
                name: name,
                completed: false,
                id: this.assignments.length + 1
            });
        }
    }
}